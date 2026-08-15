from rest_framework import serializers
from .models import Gates, Flights

class GatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gates
        fields = ["id", "code", "terminal", "is_available", "created_at"]

class FlightsSerializer(serializers.ModelSerializer):
    marca_nombre = serializers.CharField(source="marca.nombre", read_only=True)

    class Meta:
        model = Flights
        fields = ["id", "gate_id", "flight_number", "destination", "status",  "departure_time", "created_at"]