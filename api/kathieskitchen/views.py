from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Products, User, ComingSoonProduct, Category, Stock, Order, OrderItem, Log
from .serializer import (
    ProductSerializer,
    UserSerializer,
    ComingSoonProductSerializer,
    CategorySerializer,
    StockSerializer,
    OrderSerializer,
    OrderItemSerializer,
    LogSerializer,
)


class LoginView(APIView):
    """Simple email/password login endpoint for the Nuxt frontend."""

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'detail': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response(
                {'detail': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.check_password(password):
            return Response(
                {'detail': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = UserSerializer(user)
        return Response({'user': serializer.data})


class LogoutView(APIView):
    """Simple logout endpoint for the Nuxt frontend."""

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        # For now, just return success. In a full auth system, you'd invalidate tokens/sessions here.
        return Response({'detail': 'Logged out successfully.'})


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ComingSoonProductViewSet(viewsets.ModelViewSet):
    queryset = ComingSoonProduct.objects.all()
    serializer_class = ComingSoonProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
