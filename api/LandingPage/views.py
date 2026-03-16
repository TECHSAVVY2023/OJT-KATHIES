from django.shortcuts import render
from rest_framework import viewsets
from .models import Products
from .serializer import ProductSerializer

def Product_list(request):
    products = Products.objects.all()
    return render(request, 'index.html', {'products': products})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer