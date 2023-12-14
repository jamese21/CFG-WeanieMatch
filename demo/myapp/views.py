from django.shortcuts import render, HttpResponse
import os
# Create your views here.
def home(request):
	#indexPath = os.path
	return HttpResponse("WeansMatch")
