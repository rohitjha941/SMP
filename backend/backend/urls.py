
from django.contrib import admin
from django.urls import path, include
from pages import urls 
from backend import settings
from django.conf.urls.static import static


urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path ("backend/" , include('pages.urls')),
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)