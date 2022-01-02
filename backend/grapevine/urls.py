"""grapevine URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static 

from rest_framework_simplejwt import views as jwt_views

from . import views
from users.views import UserView
from question.views import QuestionView
from rest_framework import routers
from answer.views import AnswerView

router = routers.SimpleRouter()
router.register(r'user', UserView)
router.register(r'question', QuestionView) 
router.register(r'answer', AnswerView) 

urlpatterns = router.urls
urlpatterns += [
    path('admin/', admin.site.urls),
	path('', include('authentication.urls')),
    path('my-questions/', QuestionView.as_view({'get' : 'myQ'}), name='my_questions')
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

