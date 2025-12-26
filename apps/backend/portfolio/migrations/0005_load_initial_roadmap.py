from django.db import migrations
from django.core.management import call_command


def load_fixture(apps, schema_editor):
    call_command("loaddata", "initial_roadmap")


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0004_roadmapitem_related_project"),
    ]

    operations = [
        migrations.RunPython(load_fixture),
    ]
