from django.urls import path
from .views import TodoListCreate, TodoDetail, CategoryListCreate, CategoryDetail

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
    path('categories/', CategoryListCreate.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
]
