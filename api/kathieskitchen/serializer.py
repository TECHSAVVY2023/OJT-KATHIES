from rest_framework import serializers
from .models import Products, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        source='user',
        queryset=User.objects.all(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Products
        fields = [
            'id',
            'product_name',
            'description',
            'price',
            'product_image',
            'status',
            'user',
            'user_id',
            'created_at',
        ]
