from functools import cache
from django.contrib import admin
from notification.models import Notification
from django.core.paginator import Paginator 

class CachingPaginator(Paginator):
    def _get_count(self):

        if not hasattr(self, "-count"):
            self._count = None

        if self._count is None:
            try:
                key = "adm:{0}:count".format(hash(self.object_list.query.__str__()))
                self._count = cache.get(key, -1)
                if self._count == -1:
                    self._count = super().count
                    cache.set(key, self._count, 3600)
            except:
                self._count = len(self.object_list)
        return self._count

    count = property(_get_count)
    
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_filter = ['user', 'at']
    search_fields = ['user__username', 'description']
    readonly_fields = ['id', 'user', 'at']
    list_display = [
        'id',
        'sender',
        'user',
        'action',
        'post',
        'post_id',
        'description'
    ]

    show_full_result_count = False
    paginator = CachingPaginator

    

