from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.core.exceptions import ObjectDoesNotExist

from .models import Task

# Create your tests here.


class TaskModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a test user
        cls.test_user = User.objects.create_user(
            username='testuser', password='12345')
        cls.test_user.save()

        # Create a test task
        cls.test_task = Task.objects.create(
            title='test title',
            description='test description',
            status=1,
            complete=False,
            created_by=cls.test_user,
            is_active=True
        )

    def test_title_content(self):
        task = self.test_task
        expected_object_name = f'{task.title}'
        self.assertEquals(expected_object_name, 'test title')

    def test_description_content(self):
        task = self.test_task
        expected_object_name = f'{task.description}'
        self.assertEquals(expected_object_name, 'test description')

    def test_status_content(self):
        task = self.test_task
        expected_object_name = task.status
        self.assertEquals(expected_object_name, 1)

    def test_complete_content(self):
        task = self.test_task
        expected_object_name = task.complete
        self.assertEquals(expected_object_name, False)

    def test_created_by_content(self):
        task = self.test_task
        expected_object_name = task.created_by
        self.assertEquals(expected_object_name.username, 'testuser')

    def test_is_active_content(self):
        task = self.test_task
        expected_object_name = task.is_active
        self.assertEquals(expected_object_name, True)


class TaskAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a test user
        self.test_user = User.objects.create_user(
            username='testuser', password='12345')
        self.test_user.save()

        # Authenticate the test user
        self.client.force_authenticate(user=self.test_user)

        # Create a test task
        self.test_task = Task.objects.create(
            title='test title',
            description='test description',
            status=1,
            complete=False,
            created_by=self.test_user,
            is_active=True
        )

    def test_create_task(self):
        url = reverse('task-list')  # replace with your actual URL name
        data = {
            'title': 'new task',
            'description': 'new description',
            'status': 1,
            'complete': False,
            'created_by': self.test_user.id,
            'is_active': True
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(Task.objects.get(id=2).title, 'new task')

    def test_update_task(self):
        # replace with your actual URL name
        url = reverse('task-detail', kwargs={'pk': self.test_task.id})
        data = {
            'title': 'updated task',
            'description': 'updated description',
            'status': 2,
            'complete': True,
            'is_active': False
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Task.objects.get(
            title='updated task').title, 'updated task')

    def test_delete_task(self):
        # replace with your actual URL name
        # use 'task-detail' instead of 'task-delete'
        url = reverse('task-detail', kwargs={'pk': self.test_task.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        try:
            Task.objects.get(id=self.test_task.id)
            self.fail('Task object was not deleted')
        except ObjectDoesNotExist:
            pass
