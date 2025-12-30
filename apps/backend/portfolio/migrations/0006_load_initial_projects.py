from django.db import migrations
from django.core.management import call_command


def load_fixture(apps, schema_editor):
    call_command("loaddata", "initial_projects")


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0005_load_initial_roadmap"),
    ]

    operations = [
        migrations.RunPython(load_fixture),
    ]
