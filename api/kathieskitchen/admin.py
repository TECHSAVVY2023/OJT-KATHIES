from django.contrib import admin
from .models import Products, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('fname', 'lname', 'email', 'status', 'user_type', 'created_at')
    search_fields = ('fname', 'lname', 'email')
    list_filter = ('status', 'user_type')

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'price', 'status', 'created_at', 'user')
    search_fields = ('product_name', 'description')
    list_filter = ('status', 'created_at')
