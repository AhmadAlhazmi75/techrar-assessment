# Generated by Django 5.0.8 on 2024-08-07 18:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ticketing", "0009_alter_aisolution_ticket"),
    ]

    operations = [
        migrations.AlterField(
            model_name="aisolution",
            name="ticket",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ai_solutions",
                to="ticketing.ticket",
            ),
        ),
    ]
