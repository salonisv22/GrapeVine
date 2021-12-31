from django.urls import path
from .views import *
urlpatterns = [
    path('upvote/question',UpvoteQView.as_view({'post':'create'}), name="upvote_q"),
    path('downvote/question',DownvoteQView.as_view({'post':'create'}), name="downvote_q"),
    path('upvote/answer',UpvoteAView.as_view({'post':'create'}), name="upvote_a"),
    path('downvote/answer',DownvoteAView.as_view({'post':'create'}), name="downvote_a"),
]

