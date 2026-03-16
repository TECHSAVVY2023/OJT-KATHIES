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
    phone = models.CharField(max_length=20, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    profile_image = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_subscribe = models.BooleanField(default=False)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=USER_TYPE_CUSTOMER)

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