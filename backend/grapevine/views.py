from django.http import HttpResponse
from django.shortcuts import render

def temp(request):
    return render(request, "temp.html")
