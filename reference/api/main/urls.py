from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

# --------------------------------------------------------
# PUBLIC ROUTER
# --------------------------------------------------------
public_router = DefaultRouter()
public_router.register(r'products', views.PublicProductViewSet, basename='public-products')
public_router.register(r'categories', views.PublicCategoryViewSet, basename='public-categories')
public_router.register(r'comingsoon', views.PublicComingSoonViewSet, basename='public-comingsoon')
public_router.register(r'banners', views.PublicBannerViewSet, basename='public-banners')

# --------------------------------------------------------
# ADMIN ROUTER
# --------------------------------------------------------
admin_router = DefaultRouter()
admin_router.register(r'products', views.AdminProductViewSet, basename='admin-products')
admin_router.register(r'categories', views.AdminCategoryViewSet, basename='admin-categories')
admin_router.register(r'comingsoon', views.AdminComingSoonViewSet, basename='admin-comingsoon')
admin_router.register(r'banners', views.AdminBannerViewSet, basename='admin-banners')
admin_router.register(r'subscribers', views.AdminSubscriberViewSet, basename='admin-subscribers')
admin_router.register(r'orders', views.AdminOrderViewSet, basename='admin-orders')


# --------------------------------------------------------
# URLS
# --------------------------------------------------------
urlpatterns = [
    # 🧺 Public API
    path('', include(public_router.urls)),
    path("subscribe-newsletter/", views.subscribe_newsletter, name="subscribe-newsletter"),
    path('create-order/', views.create_order),

    # 🧑‍💻 Admin API (JWT-protected)
    path('admin-api/', include(admin_router.urls)),

    # 🔐 JWT Auth (SimpleJWT)
    path('admin-api/login/', views.admin_login, name='admin-login'),
    path('admin-api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('admin-api/me/', views.admin_me, name='admin-me'),
    path('admin-api/logout/', views.admin_logout, name='admin-logout'),

    # 🧭 Future-ready: OAuth
    # path('auth/', include('dj_rest_auth.urls')),
    # path('auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('auth/', include('allauth.urls')),
]
