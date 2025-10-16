from django.urls import path
from .views import MapAyushView, MappingHistoryView

urlpatterns = [
    path('map-ayush/', MapAyushView.as_view(), name='map-ayush'),
    path('history/', MappingHistoryView.as_view(), name='mapping-history'),
]