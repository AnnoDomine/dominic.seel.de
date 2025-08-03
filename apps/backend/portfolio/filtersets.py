from django.contrib.auth.models import User
from django_filters.rest_framework import FilterSet  # type: ignore


class FilterLookups:
    """
    Whitelist für erlaubte Lookups pro Datentyp.
    """

    string = ["exact", "iexact", "icontains", "istartswith", "iendswith", "in", "isnull"]
    number = ["exact", "gt", "lt", "gte", "lte", "in", "isnull"]
    date = ["exact", "gt", "lt", "gte", "lte", "date__exact", "isnull"]
    boolean = ["exact", "isnull"]


class UserFilterSet(FilterSet):
    """
    FilterSet for User model.
    Allows filtering by id, username, first_name, last_name, email, date_joined.
    """

    class Meta:
        model = User
        fields = {
            "id": FilterLookups.number,
            "username": FilterLookups.string,
            "first_name": FilterLookups.string,
            "last_name": FilterLookups.string,
            "email": FilterLookups.string,
            "date_joined": FilterLookups.date,
        }
