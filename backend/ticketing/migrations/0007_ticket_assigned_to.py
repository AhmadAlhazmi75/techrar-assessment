# Generated by Django 5.0.8 on 2024-08-07 18:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ticketing", "0006_remove_ticket_assigned_to_ticket_status"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="ticket",
            name="assigned_to",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="assigned_tickets",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
