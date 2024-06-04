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
        user = self.request.user
        queryset = Task.objects.filter(created_by=user, is_active=True)

        # Check if 'status' is provided as a query parameter
        status_param = self.request.query_params.get('status')
        if status_param is not None:
            if status_param == 9:
                queryset = queryset.filter(is_active=False)
            else:
                queryset = queryset.filter(status=status_param)
        return queryset

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
