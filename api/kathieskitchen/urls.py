from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    LoginView,
    LogoutView,
    ProductViewSet,
    UserViewSet,
    ComingSoonProductViewSet,
    CategoryViewSet,
    StockViewSet,
    OrderViewSet,
    OrderItemViewSet,
    LogViewSet,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'users', UserViewSet)
router.register(r'coming-soon-products', ComingSoonProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)
router.register(r'logs', LogViewSet)

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='api-login'),
    path('auth/logout/', LogoutView.as_view(), name='api-logout'),
    path('', include(router.urls)),
]
