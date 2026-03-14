from django.db import models

class task(models.Model):
    ProductName = models.CharField(max_length=100)
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    Description = models.CharField(max_length=100)

    def __str__(self):
        return self.ProductName
        