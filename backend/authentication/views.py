from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer

# Create your views here.
class BlacklistTokenView(GenericAPIView):
    permission_classes = [permissions.AllowAny,]
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            if 'refresh' not in request.data:
                if 'refresh' in request.COOKIES:
                    request.data['refresh'] = request.COOKIES.get('refresh', None)

            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            response = Response({"message" : "Logout Successful"}, status = 200)
            response.delete_cookie('refresh')

            return response
        except Exception as e:
            return Response(status = status.HTTP_400_BAD_REQUEST)

class Force_Logout_View(GenericAPIView):
    permission_classes = [permissions.AllowAny,]
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            outstanding_tokens = OutstandingToken.objects.filter(user = user)

            for token in outstanding_tokens:
                try:
                    RefreshToken(token).blacklist()
                except TokenError:
                    continue

            return Response({"message" : "force logout sucessful" },status = 200)
        except Exception as e:
            return Response({"message" : e }, status = status.HTTP_400_BAD_REQUEST)


def fetch_and_set_tokens(self, request):                    
    serializer = self.serializer_class(data=request.data)
    serializer.is_valid(raise_exception = True)

    if 'access' in serializer.validated_data and 'refresh' in serializer.validated_data:
        data = serializer.validated_data
        refresh_token = data.pop('refresh', None)
        response = Response(data, status = 200)
        response.set_cookie('refresh', refresh_token) #TODO: path='/refresh/'
        # response.set_cookie('access', serializer.validated_data.get("access", None), httponly = True)
        return response

    return Response({ "Error": "Something went wrong"}, status = 400)

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        return fetch_and_set_tokens(self, request)
        
class MyTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        # print(request.user)
        if 'refresh' not in request.data:
            if 'refresh' in request.COOKIES:
                request.data['refresh'] = request.COOKIES.get('refresh', None)

        return fetch_and_set_tokens(self, request)    