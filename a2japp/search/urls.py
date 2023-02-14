from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'insights', views.InsightsViewSet)
router.register(r'articles', views.ArticlesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:paraphrased>/<int:year_start>-<int:year_end>/<slug:tags>/<slug:prompt>/', views.search_and_filter),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    ]