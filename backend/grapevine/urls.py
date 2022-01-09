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
from notification.views import NotificationView

from question.views import QuestionCommentView

from users.views import UserView
from question.views import QuestionView
from rest_framework import routers
from answer.views import AnswerView
from answer.views import AnswerCommentView

router = routers.SimpleRouter()
router.register(r'user', UserView)
router.register(r'question', QuestionView) 
router.register(r'answer', AnswerView) 
router.register(r'question-comment', QuestionCommentView)
router.register(r'answer-comment', AnswerCommentView)
router.register(r'notification', NotificationView)


urlpatterns = router.urls
urlpatterns += [
    path('admin/', admin.site.urls),
	path('me/', UserView.as_view({'get' : 'me'}), name='me'),
    path('user-questions/', QuestionView.as_view({'get' : 'user_questions'}), name='user_questions'),
    path('user-answers/', AnswerView.as_view({'get' : 'user_answers'}), name='user_answers'),
    path('', include('authentication.urls')),
    path('',include('vote.urls')),
    path('',include('notification.urls')),
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

