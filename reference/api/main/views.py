# main/views.py
from django.db import transaction
from django.conf import settings
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.http import JsonResponse
from django.db.models import Sum, F
from decimal import Decimal

from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAdminUser

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action

from .models import Product, Category, ComingSoon, Banner, Subscriber, Order, OrderItem
from .serializers import (
    ProductSerializer, CategorySerializer, ComingSoonSerializer,
    BannerSerializer, SubscriberSerializer, OrderSerializer
)

from django.db.models import Case, When, IntegerField
from rest_framework.decorators import action

# =========================================================
# PUBLIC ENDPOINTS
# =========================================================

class PublicProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        spotlight = self.request.query_params.get('spotlight')
        category = self.request.query_params.get('category')
        if spotlight:
            queryset = queryset.filter(spotlight=spotlight.lower() == 'true')
        if category:
            queryset = queryset.filter(category__name__iexact=category)
        return queryset


class PublicCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class PublicComingSoonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ComingSoon.objects.all()
    serializer_class = ComingSoonSerializer
    permission_classes = [permissions.AllowAny]


class PublicBannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    permission_classes = [permissions.AllowAny]


# =========================================================
# ADMIN VIEWSETS
# =========================================================

class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]


class AdminCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


class AdminComingSoonViewSet(viewsets.ModelViewSet):
    queryset = ComingSoon.objects.all()
    serializer_class = ComingSoonSerializer
    permission_classes = [IsAdminUser]


class AdminBannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    permission_classes = [IsAdminUser]


class AdminSubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['email']


class AdminOrderViewSet(viewsets.ModelViewSet):
    """
    Admin Order management with archive/unarchive and controlled status transitions.
    """

    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status", "email", "archived"]
    search_fields = ["customer_name", "email", "address"]

    # Reusable status order priority for sorting
    STATUS_ORDER = Case(
        When(status="pending_confirmation", then=0),
        When(status="confirmed", then=1),
        When(status="packed_ready", then=2),
        When(status="en_route", then=3),
        When(status="completed", then=4),
        When(status="cancelled", then=5),
        default=6,
        output_field=IntegerField(),
    )

    def get_queryset(self):
        """
        Return orders, filtered by archived status on list views.
        Unfiltered when retrieving or updating a specific order.
        """
        queryset = Order.objects.all()

        # Only filter archived param for list view
        if self.action == "list":
            archived_param = self.request.query_params.get("archived", "false").lower()
            archived = archived_param == "true"
            queryset = queryset.filter(archived=archived)

        return queryset.order_by(self.STATUS_ORDER, "-created_at").distinct()

    # PATCH Fix — prevent overwriting missing fields
    def update(self, request, *args, **kwargs):
        """Safe update — only modify explicitly passed fields."""
        partial = True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # STATUS Update Logic
    @action(detail=True, methods=["patch"], url_path="update-status")
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get("status")

        valid_statuses = dict(Order.STATUS_CHOICES).keys()
        if new_status not in valid_statuses:
            return Response({"error": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)

        # Handle confirmation: require delivery info + recalc total
        if order.status == "pending_confirmation" and new_status == "confirmed":
            delivery_method = request.data.get("delivery_method")
            shipping_fee = request.data.get("shipping_fee")

            if not delivery_method:
                return Response(
                    {"error": "Delivery method is required when confirming an order."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                shipping_fee = Decimal(str(shipping_fee or 0))
            except:
                shipping_fee = Decimal(0)

            subtotal = (
                order.items.aggregate(total=Sum(F("quantity") * F("price_each")))["total"] or 0
            )

            order.delivery_method = delivery_method
            order.shipping_fee = shipping_fee
            order.total_amount = subtotal + shipping_fee

        # Handle invoice reference number when status = "packed_ready"
        if new_status == "packed_ready":
            invoice_ref = request.data.get("invoice_ref")

            if not invoice_ref:
                return Response(
                    {"error": "Invoice reference number is required when marking an order as packed."},
                    status=400
                )

            order.invoice_ref = invoice_ref

        # Update the status
        order.status = new_status
        order.save()  # <-- don't use update_fields, we’re saving multiple possible changes

        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

    # ARCHIVE
    @action(detail=True, methods=["patch"], url_path="archive")
    def archive_order(self, request, pk=None):
        order = self.get_object()

        if order.archived:
            return Response({"message": f"Order #{order.id} is already archived."}, status=200)

        if order.status not in ["completed", "cancelled"]:
            return Response(
                {"error": "Only completed or cancelled orders can be archived."},
                status=400,
            )

        order.archived = True
        order.save(update_fields=["archived"])
        return Response({"message": f"Order #{order.id} archived successfully."}, status=200)

    # UNARCHIVE
    @action(detail=True, methods=["patch"], url_path="unarchive")
    def unarchive_order(self, request, pk=None):
        """
        Restore archived orders back to active list.
        """
        # include archived=True in lookup
        order = Order.objects.filter(pk=pk).first()
        if not order:
            return Response({"error": "Order not found."}, status=404)

        order.archived = False
        order.save(update_fields=["archived"])
        return Response({"message": f"Order #{order.id} unarchived successfully."}, status=200)
        
# =========================================================
# PUBLIC UTILITY ENDPOINTS
# =========================================================

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def subscribe_newsletter(request):
    """Handles newsletter subscriptions."""
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=400)

    # Prevent duplicates
    if Subscriber.objects.filter(email=email).exists():
        return Response({'message': 'You are already subscribed!'}, status=200)

    # Create subscriber only — email sent automatically via signal
    Subscriber.objects.create(email=email)

    return Response({'message': 'Subscription successful! Please check your inbox 😊'}, status=201)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@transaction.atomic
def create_order(request):
    data = request.data
    try:
        customer = data.get('customer', {})
        items = data.get('items', [])
        if not customer.get('email') or not items:
            return Response({"error": "Missing customer or items"}, status=400)

        order = Order.objects.create(
            customer_name=customer.get('name'),
            email=customer.get('email'),
            address=customer.get('address'),
            phone=customer.get('phone'),
            city=customer.get('city'),
            zip_code=customer.get('zip'),
            notes=customer.get('notes'),
            preferred_delivery_date=customer.get('deliveryDate') or None,
            total_amount=0,
        )

        total = 0
        for item in items:
            product = Product.objects.select_for_update().get(id=item['product_id'])
            qty = int(item.get('quantity', 0))
            if product.stock < qty:
                transaction.set_rollback(True)
                return Response({"error": f"Not enough stock for {product.name}."}, status=400)
            product.stock -= qty
            product.save()
            order_item = OrderItem.objects.create(order=order, product=product, quantity=qty, price_each=float(item['price_each']))
            total += order_item.subtotal

        order.total_amount = total
        order.save()

        return Response({"message": "Order placed successfully", "order_id": order.id}, status=201)

    except Product.DoesNotExist:
        transaction.set_rollback(True)
        return Response({"error": "A product was not found."}, status=400)
    except Exception as e:
        transaction.set_rollback(True)
        return Response({"error": str(e)}, status=500)


# =========================================================
# ADMIN AUTH (JWT-BASED)
# =========================================================

from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def admin_login(request):
    """Issue JWT tokens for staff users only."""
    from django.contrib.auth import authenticate
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if not user or not user.is_staff:
        return Response({"error": "Invalid credentials"}, status=403)

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {"username": user.username, "email": user.email},
    })


@api_view(['GET'])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def admin_me(request):
    """Return current admin profile."""
    user = request.user
    return Response({"username": user.username, "email": user.email})


@api_view(['POST'])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def admin_logout(request):
    """Client-side should just delete tokens, but we can blacklist refresh here if needed."""
    return Response({"message": "Logged out (client should clear tokens)."})


# Token refresh endpoint is provided by SimpleJWT
class AdminTokenRefreshView(TokenRefreshView):
    pass
