from django.urls import path
from .views import *
urlpatterns = [
    path('upvote/question',UpvoteQuestionView.as_view({'post':'create'}), name="upvote_q"),
    path('downvote/question',DownvoteQuestionView.as_view({'post':'create'}), name="downvote_q"),
    path('upvote/answer',UpvoteAnswerView.as_view({'post':'create'}), name="upvote_a"),
    path('downvote/answer',DownvoteAnswerView.as_view({'post':'create'}), name="downvote_a"),
]

