from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Ticket(models.Model):
    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    ]
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('CLOSED', 'Closed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    status = models.CharField(max_length=11, choices=STATUS_CHOICES, default='OPEN')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_tickets')

class AISolution(models.Model):
    ticket = models.OneToOneField(Ticket, on_delete=models.CASCADE, related_name='ai_solution')
    solution = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
