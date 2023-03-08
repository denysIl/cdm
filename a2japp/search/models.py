from django.db import models

# Create your models here.
class Article(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=65536)
    authors = models.CharField(max_length=65536)
    year = models.IntegerField()
    citation = models.CharField(max_length=65536)
    tags = models.CharField(max_length=65536)
    abstract = models.CharField(max_length=65536)
    ai_abstract = models.CharField(max_length=65536)

class Insight(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.CharField(max_length=65536)
    source = models.IntegerField()
    paraphrased = models.IntegerField()
    location = models.CharField(max_length=65536)
