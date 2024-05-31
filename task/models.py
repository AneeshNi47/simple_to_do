from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):
    TASK_STATUS_TYPES = (
        (0, 'Created'),
        (1, 'To-Do'),
        (2, 'In Progress'),
        (3, 'Done'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.IntegerField(choices=TASK_STATUS_TYPES)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='task_created')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
