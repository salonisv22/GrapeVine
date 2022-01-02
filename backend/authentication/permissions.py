from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):

    def has_permission(self, request, view):
        print("permission")
        return request.user.is_authenticated 

    def has_object_permission(self, request, view, obj):
        if type(obj) == type(request.user) : 
            return obj == request.user or request.user.is_staff
        return obj.user == request.user or request.user.is_staff
        
    