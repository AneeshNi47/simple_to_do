from django.views.generic import View
from django.http import HttpResponse
import os


class FrontendAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(os.path.dirname(__file__),
                                   'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except FileNotFoundError:
            return HttpResponse(
                "This URL is only used when you have built the React app.",
                status=501,
            )
