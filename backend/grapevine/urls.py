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
from downvote.views import DownvoteView
from upvote.views import UpvoteView
from . import views
from users.views import UserView
from question.views import QuestionView
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', UserView)
router.register(r'questions', QuestionView) 
router.register(r'upvote', UpvoteView)
router.register(r'downvote', DownvoteView)
urlpatterns = router.urls
urlpatterns += [
    path('admin/', admin.site.urls),
    path('templates/',views.temp, name="temp"),
    path('login/',
		jwt_views.TokenObtainPairView.as_view(),
		name ='token_obtain_pair'),
	path('token/refresh/',
		jwt_views.TokenRefreshView.as_view(),
		name ='token_refresh'),
	path('', include('authentication.urls')),
    path('all-questions/', QuestionView.as_view({'get' : 'allQ'}), name='all_questions')
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

