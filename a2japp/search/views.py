from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Article, Insight
from .serializers import ArticleSerializer, InsightSerializer

from django.db.models import Q

from rest_framework import viewsets

from txtai.embeddings import Embeddings

# Create your views here.

class InsightsViewSet(viewsets.ModelViewSet):
    queryset = Insight.objects.all().order_by('id')
    serializer_class = InsightSerializer

class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('id')
    serializer_class = ArticleSerializer

def search_and_filter(request, paraphrased, year_start, year_end, tags, prompt):
    #relevant_objects = Insight.objects.filter(Q(keywords__icontains=prompt))


    prompt = prompt.replace("-", " ")
    print("Prompt: ", prompt)

    tags = tags.replace("+", " ")
    tags = tags.split("-")


    relevant_objects = []
    relevant_ids = []
    embeddings = Embeddings()

    embeddings.load("./search/insights_index/")
    
    results = embeddings.search(prompt, 1000)

    if paraphrased == 0 or paraphrased == 1:
        for r in results:
            valid = 1

            current_insight = Insight.objects.all().filter(id=r[0]).values()
            
            if current_insight[0]['paraphrased'] != paraphrased:
                valid = 0

            print("Current insight: ", current_insight[0])
            print("Looking for the source: ", int(current_insight[0]['source']))
            parent_article = Article.objects.all().filter(id=int(current_insight[0]['source'])).values()
            #print("Parent article: ", parent_article)
            if parent_article[0]['year'] >= year_start and parent_article[0]['year'] <= year_end and valid == 1:
                for t in tags:
                    if t not in parent_article[0]['tags']: 
                        valid = 0

                if valid == 1:
                    relevant_ids.append(r[0])
    else:
        for r in results:
            valid = 1
            current_insight = Insight.objects.all().filter(id=r[0]).values()
            print("Current insight: ", current_insight[0])
            print("Looking for the source: ", int(current_insight[0]['source']))
            parent_article = Article.objects.all().filter(id=int(current_insight[0]['source'])).values()
            #print("Parent article: ", parent_article)
            if parent_article[0]['year'] >= year_start and parent_article[0]['year'] <= year_end and valid == 1:
                for t in tags:
                    if t not in parent_article[0]['tags']: 
                        valid = 0

                if valid == 1:
                    relevant_ids.append(r[0])


    
    relevant_objects = Insight.objects.all().filter(id__in=relevant_ids)
            

    print(relevant_ids)

    serializer = InsightSerializer(relevant_objects, many=True)

    return JsonResponse(serializer.data, safe=False)