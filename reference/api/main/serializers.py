# Serializers.py
from rest_framework import serializers
from .models import Product, Category, ComingSoon, Banner, Subscriber, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField(source='image.url')

    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    image_url = serializers.ReadOnlyField(source='image.url')

    class Meta:
        model = Product
        fields = '__all__'


class ComingSoonSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField(source='image.url')

    class Meta:
        model = ComingSoon
        fields = '__all__'

class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField(source='image.url')

    class Meta:
        model = Banner
        fields = '__all__'


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price_each', 'subtotal']
        read_only_fields = ['subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    delivery_method = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    shipping_fee = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=0)
    invoice_ref = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    archived = serializers.BooleanField(required=False, default=False)
    
    class Meta:
        model = Order
        fields = [
            'id',
            'customer_name',
            'email',
            'phone',
            'address',
            'city',
            'zip_code',
            'notes',
            'preferred_delivery_date',
            'delivery_method',      
            'shipping_fee',
            'invoice_ref',         
            'total_amount',
            'status',
            'archived',             
            'created_at',
            'updated_at',
            'items',
        ]
        read_only_fields = ['created_at', 'updated_at', 'total_amount']

    def create(self, validated_data):
        """
        Create a new order with items and compute total amount
        including shipping fee if present.
        """
        items_data = validated_data.pop('items', [])
        shipping_fee = validated_data.pop('shipping_fee', 0)
        order = Order.objects.create(**validated_data)

        total = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']

            # Stock check
            if product.stock < quantity:
                raise serializers.ValidationError(f"Insufficient stock for {product.name}")

            product.stock -= quantity
            product.save()

            price_each = product.price
            total += price_each * quantity

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_each=price_each
            )

        # Include shipping fee in total
        order.total_amount = total + (shipping_fee or 0)
        order.shipping_fee = shipping_fee or 0
        order.save()
        return order

    def update(self, instance, validated_data):
        """
        Update order details (like status, delivery method, or shipping fee)
        and recalculate total if shipping fee changes.
        """
        shipping_fee = validated_data.get('shipping_fee', instance.shipping_fee)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # 🔁 Recompute total including shipping fee
        item_total = sum(item.subtotal for item in instance.items.all())
        instance.total_amount = item_total + (shipping_fee or 0)
        instance.save()
        return instance
