#from rest_framework.routers import DefaultRouter
#from .views import create_book
from django.urls import path, include # type: ignore
from . import views

urlpatterns = [
    path('books/', views.book_handler, name="books"),
    path("books/<int:book_id>/", views.book_detail_handler, name="book-delete"),
]