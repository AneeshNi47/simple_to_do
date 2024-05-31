from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer, TaskStatusUpdateSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        # Associate the task with the authenticated user
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['patch'], url_path='update-status')
    def update_status(self, request, pk=None):
        task = self.get_object()
        serializer = TaskStatusUpdateSerializer(
            task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Use TaskSerializer to return the full task details
            full_task_serializer = TaskSerializer(task)
            return Response(full_task_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
