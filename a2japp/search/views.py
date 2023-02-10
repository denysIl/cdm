from django.shortcuts import render
from django.http import HttpResponse

from .models import Article, Insight
from .serializers import ArticleSerializer, InsightSerializer

from rest_framework import viewsets

# Create your views here.

class InsightsViewSet(viewsets.ModelViewSet):
    queryset = Insight.objects.all().order_by('id')
    serializer_class = InsightSerializer

class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('id')
    serializer_class = ArticleSerializer