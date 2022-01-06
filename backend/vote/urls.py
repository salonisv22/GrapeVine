from django.urls import path
from .views import *
urlpatterns = [
    path('upvote/question/',UpvoteQuestionView.as_view({'post':'create', 'get':'list'}), name="upvote_q"),
    path('downvote/question/',DownvoteQuestionView.as_view({'post':'create', 'get':'list'}), name="downvote_q"),
    path('upvote/answer/',UpvoteAnswerView.as_view({'post':'create', 'get':'list'}), name="upvote_a"),
    path('downvote/answer/',DownvoteAnswerView.as_view({'post':'create', 'get':'list'}), name="downvote_a"),
]

