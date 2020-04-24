from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from pages import urls
from rest_framework.documentation import include_docs_urls

from backend import settings

API_TITLE = "SMP API Docs"
API_DESCRIPTION = ""

urlpatterns = [
    path("backend/admin/", admin.site.urls),
    path("backend/", include("pages.urls")),
    path("docs/", include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    path("documents/", include("docs.urls")),
    url(r"^tinymce/", include("tinymce.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
