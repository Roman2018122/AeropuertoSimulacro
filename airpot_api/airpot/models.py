from django.db import models

class Gates(models.Model):
    code = models.CharField(max_length=10, unique=True)
    terminal = models.CharField(max_length=20)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

class Status (models.TextChoices):
        SCHEDULED = "scheduled", "scheduled"
        BOARDING_ = "boarding", "boarding "
        DEPARTED = "departed", "departed"
        DELAYED = "delayed", "delayed"
        CANCELLED = "cancelled", "cancelled"

class Flights(models.Model):
    gate_id = models.ForeignKey(Gates, on_delete=models.PROTECT, related_name="flights")
    flight_number = models.CharField(max_length=20)
    destination = models.CharField(max_length=100)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.SCHEDULED
    )
    departure_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.gate_id.code} {self.flight_number} ({self.destination})"