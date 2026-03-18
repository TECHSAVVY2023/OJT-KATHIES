from django.contrib import admin
from .models import Products, User, ComingSoonProduct, Category, Stock, Order, OrderItem, Log


from django.contrib.auth.hashers import make_password


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('fname', 'lname', 'email', 'status', 'user_type', 'created_at')
    search_fields = ('fname', 'lname', 'email')
    list_filter = ('status', 'user_type')

    def save_model(self, request, obj, form, change):
        # When admins create/update users here, ensure the password gets hashed.
        password = form.cleaned_data.get('password')
        if password:
            obj.password = make_password(password)
        super().save_model(request, obj, form, change)

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'status', 'created_at', 'user')
    search_fields = ('product_name', 'description')
    list_filter = ('status', 'created_at')

@admin.register(ComingSoonProduct)
class ComingSoonProductAdmin(admin.ModelAdmin):
    list_display = ('coming_soon_name', 'coming_soon_date', 'created_at', 'product_id')
    search_fields = ('coming_soon_name', 'description')
    list_filter = ('coming_soon_date', 'created_at')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'created_at', 'product_id')
    search_fields = ('category_name',)
    list_filter = ('created_at',)

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('product_id', 'quantity', 'threshold', 'date_restocked', 'created_at')
    search_fields = ('product_id__product_name',)
    list_filter = ('date_restocked', 'created_at')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'total', 'payment_method', 'status', 'created_at', 'user')
    search_fields = ('user__email',)
    list_filter = ('status', 'payment_method', 'created_at')


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'unit_price', 'subtotal', 'created_at')
    search_fields = ('order__id', 'product__product_name')
    list_filter = ('created_at',)


@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ('action', 'date_time', 'user')
    search_fields = ('action', 'details', 'user__email')
    list_filter = ('date_time',)
