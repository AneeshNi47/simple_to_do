# Simple To Do App

This is a Simple To-do web application built with Django Rest Framework for the backend and ReactJS for the frontend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.8 or higher
- Node.js and npm

### Backend Setup

1. Clone the repository:

   ```
   git clone https://github.com/AneeshNi47/simple_to_do
   ```

2. Navigate to the project directory:

   ```
   cd simple_to_do
   ```

3. Create a virtual environment:

   ```
   python3 -m venv env
   ```

4. Activate the virtual environment:

   ```
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

5. Install the Python dependencies:

   ```
   pip install -r requirements.txt
   ```

6. Apply the migrations:

   ```
   python manage.py migrate
   ```

7. Create Super User:

   ```
   python manage.py createsuperuser
   ```

8. Run the server:
   ```
   python manage.py runserver
   ```

The React Application has already been build, and the buld files are used for the UI, but in case any modification to the frontend app is to be done, then follow the below steps.

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install the npm dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Building the Frontend

After making changes to the frontend, you can build the static files with:

1. Run Build:
   ```
   npm run build
   ```
