from django.contrib import admin
from .models import Product, Category, ComingSoon, Banner, Subscriber, Order, OrderItem


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'spotlight', 'deal')
    list_filter = ('spotlight', 'category')
    search_fields = ('name', 'label')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')


@admin.register(ComingSoon)
class ComingSoonAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'image')


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')


class OrderItemInline(admin.TabularInline):
    """Show Order Items inline inside the Order page."""
    model = OrderItem
    extra = 0  # don't show extra empty rows
    readonly_fields = ('product', 'quantity', 'price_each', 'subtotal')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'customer_name',
        'email',
        'status',
        'total_amount',
        'created_at',
        'preferred_delivery_date',  # optional extra column
    )
    list_filter = (
        'status',
        'created_at',
        'preferred_delivery_date',  # helpful for deliveries
    )
    search_fields = (
        'customer_name',
        'email',
        'address',
        'phone',
        'city',
        'zip_code',
    )
    readonly_fields = (
        'total_amount',
        'created_at',
        'updated_at',
    )
    inlines = [OrderItemInline]
    ordering = ('-created_at',)

    # Optional: quick actions
    actions = ['mark_as_packed', 'mark_as_completed', 'cancel_order']

    def mark_as_packed(self, request, queryset):
        updated = queryset.update(status='packed_ready')
        self.message_user(request, f"{updated} order(s) marked as Packed / Ready to Deliver.")
    mark_as_packed.short_description = "Mark selected orders as Packed / Ready to Deliver"

    def mark_as_completed(self, request, queryset):
        updated = queryset.update(status='completed')
        self.message_user(request, f"{updated} order(s) marked as Completed.")
    mark_as_completed.short_description = "Mark selected orders as Completed"

    def cancel_order(self, request, queryset):
        cancelled = 0
        for order in queryset:
            if order.status != 'cancelled':
                order.cancel_order()
                cancelled += 1
        self.message_user(request, f"{cancelled} order(s) cancelled and stock restored.")
    cancel_order.short_description = "Cancel selected orders (restock items)"


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity', 'price_each')
    search_fields = ('order__customer_name', 'product__name')
