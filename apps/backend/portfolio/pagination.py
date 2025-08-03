from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    """
    Standard-Paginierung für API-Ergebnisse.
    Seiten können über ?page=X und die Größe über ?page_size=Y angefragt werden.
    """

    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100
