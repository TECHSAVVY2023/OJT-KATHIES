from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Product_list, name='product_list'),
]