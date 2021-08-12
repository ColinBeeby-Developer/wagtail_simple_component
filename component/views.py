from django.http import HttpResponse
from django.template import loader

def calculator(request):
    context = {}
    template = loader.get_template('component/index.html')
    return HttpResponse(template.render(context, request))
    # return HttpResponse("This is the calculator")
