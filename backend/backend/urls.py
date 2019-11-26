
from django.contrib import admin
from django.urls import path, include
from pages import urls 
from backend import settings
from django.conf.urls.static import static
from django.conf.urls import url
from rest_framework.documentation import include_docs_urls

API_TITLE = 'SMP API Docs'
API_DESCRIPTION = ''


urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path ("backend/" , include('pages.urls')),
    path('docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION))
 
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)