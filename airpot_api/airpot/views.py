from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Gates, Flights
from .serializers import GatesSerializer, FlightsSerializer
from .permissions import IsAdminOrReadOnly

class GatesViewSet(viewsets.ModelViewSet):
    queryset = Gates.objects.all().order_by("id")
    serializer_class = GatesSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["code", "terminal"]
    ordering_fields = ["id", "code", "terminal", "is_available", "created_at"]

class FlightsViewSet(viewsets.ModelViewSet):
    queryset = Flights.objects.select_related("flights").all().order_by("-id")
    serializer_class = FlightsSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["gate_id"]
    search_fields = ["flight_number", "destination", "status", "departure_time"]
    ordering_fields = ["id", "gate_id", "flight_number", "destination", "status", "departure_time", "created_at"]

    def get_queryset(self):
        qs = super().get_queryset()
        anio_min = self.request.query_params.get("anio_min")
        anio_max = self.request.query_params.get("anio_max")
        if anio_min:
            qs = qs.filter(anio__gte=int(anio_min))
        if anio_max:
            qs = qs.filter(anio__lte=int(anio_max))
        return qs

    def get_permissions(self):
        if self.action == "list":
            return [AllowAny()]
        return super().get_permissions()