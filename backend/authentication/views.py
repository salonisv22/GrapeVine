from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer

# Create your views here.
class BlacklistTokenView(GenericAPIView):
    # permission_classes = [permissions.AllowAny,]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            if 'refresh' not in request.data:
                if 'refresh' in request.COOKIES:
                    request.data['refresh'] = request.COOKIES.get('refresh', None)
                    
            refresh_token = request.data.get("refresh", None)
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                pass

            response = Response({"message" : "Logout Successful"}, status = 200)
            response.delete_cookie('refresh')

            return response
        except Exception as e:
            return Response(status = status.HTTP_400_BAD_REQUEST)

class Force_Logout_View(GenericAPIView):
    # permission_classes = [permissions.AllowAny,]
    permission_classes = [permissions.IsAuthenticated]

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
    serializer = self.serializer_class(data = request.data)
    
    try:
        serializer.is_valid(raise_exception = True)
    except:
        return Response({"error" : "Invalid Token" }, status = 401)

    if 'access' in serializer.validated_data and 'refresh' in serializer.validated_data:
        data = serializer.validated_data
        refresh_token = data.pop('refresh', None)
        response = Response()
        response.data = data
        response.status = 200
        response.set_cookie(
            key = "refresh",
            value = refresh_token,
            max_age = 365 * 24 * 60 * 60 ,
            secure = True,
            httponly = True,
            samesite = 'Lax',
            # path = '/refresh'
        )
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
        if 'refresh' not in request.data:
            if 'refresh' in request.COOKIES:
                request.data['refresh'] = request.COOKIES.get('refresh', None)
        
        print("WE ARE HERE")

        return fetch_and_set_tokens(self, request)    