from django.contrib.auth.hashers import check_password, make_password
from django.db import models

class User(models.Model):

    STATUS_ACTIVE = "Active"
    STATUS_INACTIVE = "Inactive"

    STATUS_CHOICES = [
        (STATUS_ACTIVE, "Active"),
        (STATUS_INACTIVE, "Inactive"),
    ]

    USER_TYPE_ADMIN = "Admin"
    USER_TYPE_CUSTOMER = "Customer"

    USER_TYPE_CHOICES = [
        (USER_TYPE_ADMIN, "Admin"),
        (USER_TYPE_CUSTOMER, "Customer"),
    ]

    fname = models.CharField(max_length=150)
    lname = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    profile_image = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_subscribe = models.BooleanField(default=False)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=USER_TYPE_CUSTOMER)

    def set_password(self, raw_password: str):
        """Hash and store the user's password."""
        self.password = make_password(raw_password)
        self.save(update_fields=["password"])

    def check_password(self, raw_password: str) -> bool:
        """Return True if the given raw password matches the stored hash."""
        if not self.password:
            return False
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.fname} {self.lname}"


class Products(models.Model):
    STATUS_IN_STOCK = "In Stock"
    STATUS_OUT_OF_STOCK = "Out of Stock"

    STATUS_CHOICES = [
        (STATUS_IN_STOCK, "In Stock"),
        (STATUS_OUT_OF_STOCK, "Out of Stock"),
    ]

    product_name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product_image = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_IN_STOCK)
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.product_name


class ComingSoonProduct(models.Model):
    coming_soon_name = models.CharField(max_length=100)
    description = models.TextField()
    coming_soon_image = models.CharField(max_length=255, null=True, blank=True)
    coming_soon_date = models.DateField()
    product_id = models.ForeignKey('Products', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Coming Soon Product"
        verbose_name_plural = "Coming Soon Products"

    def __str__(self):
        return self.coming_soon_name


class Category(models.Model):
    category_name = models.CharField(max_length=100)
    category_image = models.CharField(max_length=255, null=True, blank=True)
    product_id = models.ForeignKey('Products', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.category_name


class Stock(models.Model):
    quantity = models.PositiveIntegerField(default=0)
    threshold = models.PositiveIntegerField(default=10)
    date_restocked = models.DateField(null=True, blank=True)
    product_id = models.ForeignKey('Products', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Stock"
        verbose_name_plural = "Stocks"

    def __str__(self):
        return f"Stock for {self.product_id.product_name if self.product_id else 'Unknown'} - {self.quantity} units"


class Order(models.Model):
    PAYMENT_METHOD_CASH = "Cash"

    PAYMENT_METHOD_CHOICES = [
        (PAYMENT_METHOD_CASH, "Cash"),
    ]

    STATUS_PENDING = "Pending"
    STATUS_COMPLETED = "Completed"
    STATUS_CANCELLED = "Cancelled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    total = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default=PAYMENT_METHOD_CASH)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return f"Order {self.id} - {self.status} - {self.total}"


class OrderItem(models.Model):
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey('Products', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"

    def __str__(self):
        return f"OrderItem {self.id} - {self.product.product_name if self.product else 'Unknown'} x{self.quantity}"


class Log(models.Model):
    action = models.CharField(max_length=255)
    details = models.TextField(null=True, blank=True)
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Log"
        verbose_name_plural = "Logs"

    def __str__(self):
        return f"Log {self.id} - {self.action} - {self.date_time}"