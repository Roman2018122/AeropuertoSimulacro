from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import GatesViewSet, FlightsViewSet



from .flight_events_views import flight_events_list_create, flight_events_detail
from .air_lines_views import air_lines_list_create, air_lines_detail
router = DefaultRouter()
router.register(r"gates", GatesViewSet, basename="gates")
router.register(r"flights", FlightsViewSet, basename="flights")

urlpatterns = [

    path("flight_events/", flight_events_list_create),
    path("flight_events/<str:id>/", flight_events_detail),
    path("air_lines/", air_lines_list_create),
    path("air_lines/<str:id>/", air_lines_detail),
]
urlpatterns += router.urls