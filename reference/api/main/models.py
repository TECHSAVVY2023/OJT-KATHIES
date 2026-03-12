# Models.py
from django.db import models, transaction
from django.utils import timezone

DEFAULT_IMAGE_URL = "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com/default.png"

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return DEFAULT_IMAGE_URL

class Product(models.Model):
    name = models.CharField(max_length=200)
    label = models.CharField(max_length=100, blank=True, null=True) # e.g. "New", "Bestseller"
    description = models.TextField(blank=True, null=True)

    image = models.ImageField(upload_to='products/', blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    deal = models.CharField(max_length=100, blank=True, null=True) 
    size = models.CharField(max_length=50, blank=True, null=True)  # e.g. "Small", "500g", "1L"

    stock = models.PositiveIntegerField(default=0)
    spotlight = models.BooleanField(default=False)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def is_available(self):
        """Automatically determine if product is available based on stock."""
        return self.stock > 0

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return DEFAULT_IMAGE_URL
    
class ComingSoon(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='comingsoon/', blank=True, null=True)

    class Meta:
        verbose_name = "Coming Soon Item"
        verbose_name_plural = "Coming Soon Items"

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return DEFAULT_IMAGE_URL

class Banner(models.Model):
    image = models.ImageField(upload_to='banners/', blank=True, null=True)

    class Meta:
        verbose_name = "Banner"
        verbose_name_plural = "Banners"

    def __str__(self):
        return f"Banner {self.id}"

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return DEFAULT_IMAGE_URL

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Subscriber"
        verbose_name_plural = "Subscribers"

    def __str__(self):
        return self.email


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending_confirmation', 'Pending Confirmation'),
        ('confirmed', 'Order Confirmed'),
        ('packed_ready', 'Packed / Ready to Deliver'),
        ('en_route', 'En Route/Delivering'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    customer_name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.TextField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    preferred_delivery_date = models.DateField(blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending_confirmation')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    delivery_method = models.CharField(max_length=100, blank=True, null=True,)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0,)
    invoice_ref = models.CharField(max_length=255, blank=True, null=True)
    archived = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} ({self.get_status_display()}) - {self.customer_name}"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._original_status = self.status

    def save(self, *args, **kwargs):
        """Automatically restock items if the order is marked as cancelled."""
        # Check if status changed to 'cancelled'
        if self.pk:
            previous = Order.objects.filter(pk=self.pk).first()
            if previous and previous.status != "cancelled" and self.status == "cancelled":
                self.restock_items()

        super().save(*args, **kwargs)

    @transaction.atomic
    def restock_items(self):
        """Return all ordered product quantities to stock."""
        for item in self.items.all():
            product = item.product
            product.stock += item.quantity
            product.save()

    def cancel_order(self):
        """Manual method to cancel and restock (if needed programmatically)."""
        if self.status != 'cancelled':
            self.status = 'cancelled'
            self.save()
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price_each = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"

    @property
    def subtotal(self):
        return (self.price_each or 0) * (self.quantity or 0)