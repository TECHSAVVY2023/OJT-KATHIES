from rest_framework import serializers
from .models import Products, User, ComingSoonProduct, Category, Stock, Order, OrderItem, Log


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'fname',
            'lname',
            'name',
            'email',
            'password',
            'phone',
            'age',
            'profile_image',
            'status',
            'created_at',
            'is_subscribe',
            'user_type',
            'role',
        ]

    def get_name(self, obj: User) -> str:
        return f"{obj.fname} {obj.lname}".strip()

    def get_role(self, obj: User) -> str:
        return obj.user_type.lower() if obj.user_type else ''

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
        return user


class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        source='user',
        queryset=User.objects.all(),
        write_only=True,
        required=False,
    )
    category = serializers.SerializerMethodField()
    stockCount = serializers.SerializerMethodField()
    category_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    quantity = serializers.IntegerField(write_only=True, required=False, min_value=0)

    class Meta:
        model = Products
        fields = [
            'id',
            'product_name',
            'description',
            'price',
            'product_image',
            'status',
            'category',
            'stockCount',
            'category_name',
            'quantity',
            'user',
            'user_id',
            'created_at',
        ]

    def get_category(self, obj: Products) -> str:
        cat = Category.objects.filter(product_id=obj).order_by('-created_at').first()
        return cat.category_name if cat else ''

    def get_stockCount(self, obj: Products) -> int:
        stock = Stock.objects.filter(product_id=obj).order_by('-created_at').first()
        return int(stock.quantity) if stock else 0

    def _upsert_category_and_stock(self, product: Products, category_name: str | None, quantity: int | None):
        if category_name is not None:
            if category_name.strip():
                Category.objects.update_or_create(
                    product_id=product,
                    defaults={
                        'category_name': category_name.strip(),
                    },
                )
            else:
                Category.objects.filter(product_id=product).delete()

        if quantity is not None:
            Stock.objects.update_or_create(
                product_id=product,
                defaults={
                    'quantity': quantity,
                },
            )

    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        quantity = validated_data.pop('quantity', None)
        product = super().create(validated_data)
        self._upsert_category_and_stock(product, category_name, quantity)
        return product

    def update(self, instance, validated_data):
        category_name = validated_data.pop('category_name', None)
        quantity = validated_data.pop('quantity', None)
        product = super().update(instance, validated_data)
        self._upsert_category_and_stock(product, category_name, quantity)
        return product


from datetime import date


class ComingSoonProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComingSoonProduct
        fields = [
            'id',
            'coming_soon_name',
            'description',
            'coming_soon_image',
            'coming_soon_date',
            'product_id',
            'created_at',
        ]

    def create(self, validated_data):
        # Ensure there is a date for the coming soon product so the model's non-nullable field is satisfied.
        if 'coming_soon_date' not in validated_data or validated_data.get('coming_soon_date') is None:
            validated_data['coming_soon_date'] = date.today()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'coming_soon_date' not in validated_data or validated_data.get('coming_soon_date') is None:
            validated_data['coming_soon_date'] = instance.coming_soon_date or date.today()
        return super().update(instance, validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'category_name',
            'category_image',
            'product_id',
            'created_at',
        ]


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = [
            'id',
            'quantity',
            'threshold',
            'date_restocked',
            'product_id',
            'created_at',
        ]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'total',
            'payment_method',
            'status',
            'created_at',
            'user',
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id',
            'quantity',
            'unit_price',
            'subtotal',
            'order',
            'product',
            'created_at',
        ]


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = [
            'id',
            'action',
            'details',
            'date_time',
            'user',
        ]
