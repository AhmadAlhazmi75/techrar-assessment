# Techrar Assessment Project

## Table of Contents
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Blocks](#project-blocks)
  - [Authentication](#authentication)
  - [CrewAI-Powered Question Answering API](#crewai-powered-question-answering-api)
  - [Ticketing System](#ticketing-system)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)

## Architecture

- Chat functionality architecture:

  ![crewai](./docs/crewai.png)

- Ticketing System Architecture:

  ![Architecture](./docs/architecture.png)

## Tech Stack

### Backend
- Django (Django-Ninja): REST API framework
- OpenAI: Chat agent
- CrewAI: Search PDF tool, task organization
- SQLite (Postgresql in Production): Data storage
- ChromaDB: Vector Database for CrewAI Search PDF tool
- Django-Cors-Headers: CORS management
- Python-Dotenv: Environment variable management

### Frontend
- NextJS: React framework
- TailwindCSS: CSS framework
- Framer Motion: Animation library
- Axios: HTTP client
- React-hot-toast: Toast notifications

## Project Blocks

### Authentication

Token-based authentication system implemented with Django and Django Ninja.

#### Features
- User registration
- Login/Logout
- User info retrieval
- Role-based access control (`is_admin` field)

#### Security
- Password validation
- Cryptographically secure token generation
- Duplicate username and email prevention

### CrewAI-Powered Question Answering API

AI-powered question answering system that analyzes system-specific documentation.

#### Features
- Integration with OpenAI API
- PDF search tools for different system documentations
- Customizable crew creation for specific systems

### Ticketing System

Comprehensive ticketing system with AI-powered solutions.

#### Features
- Ticket creation and management
- AI solution generation
- Solution rating system (admin only)
- User assignment
- Flexible system selection for AI solutions

## API Documentation

### Authentication

#### Register
- **Endpoint**: `POST /api/auth/register`
- **Request**:
  ```json
  {
    "username": "newuser",
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_auth_token_here"
  }
  ```

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Request**:
  ```json
  {
    "username": "existinguser",
    "password": "userpassword123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_auth_token_here"
  }
  ```

#### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Headers**: `Authorization: Bearer your_auth_token_here`
- **Response**: HTTP 200 OK

#### Get User Info
- **Endpoint**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer your_auth_token_here`
- **Response**:
  ```json
  {
    "id": 1,
    "username": "existinguser",
    "email": "user@example.com",
    "is_admin": false
  }
  ```

### CrewAI Question Answering

#### Ask a Question
- **Endpoint**: `POST /crewai/ask`
- **Request**:
  ```json
  {
    "system": "system1",
    "prompt": "How does feature X work?"
  }
  ```
- **Response**:
  ```json
  {
    "result": "Feature X works by..."
  }
  ```

### Ticketing System

#### Create Ticket
- **Endpoint**: `POST /tickets/tickets`
- **Headers**: `Authorization: Bearer your_auth_token_here`
- **Request**:
  ```json
  {
    "title": "New Feature Request",
    "description": "We need a new feature that...",
    "priority": "High"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "New Feature Request",
    "description": "We need a new feature that...",
    "created_at": "2024-08-07T12:00:00Z",
    "updated_at": "2024-08-07T12:00:00Z",
    "priority": "High",
    "status": "Open",
    "assigned_to": "existinguser"
  }
  ```

#### Get Ticket
- **Endpoint**: `GET /tickets/tickets/{ticket_id}`
- **Response**:
  ```json
  {
    "id": 1,
    "title": "New Feature Request",
    "description": "We need a new feature that...",
    "created_at": "2024-08-07T12:00:00Z",
    "updated_at": "2024-08-07T12:00:00Z",
    "priority": "High",
    "status": "Open",
    "assigned_to": "existinguser",
    "ai_solution": {
      "solution": "To implement this feature...",
      "created_at": "2024-08-07T12:30:00Z",
      "likes": 0,
      "dislikes": 0
    }
  }
  ```

#### Generate AI Solution
- **Endpoint**: `POST /tickets/tickets/{ticket_id}/ai-solution`
- **Query Parameters**: `system=system1`
- **Response**:
  ```json
  {
    "id": 1,
    "ticket_id": 1,
    "solution": "Based on the documentation, we can implement this feature by...",
    "created_at": "2024-08-07T12:30:00Z",
    "likes": 0,
    "dislikes": 0
  }
  ```

#### Like/Dislike AI Solution
- **Endpoint**: `POST /tickets/ai-solutions/{solution_id}/like` or `/ai-solutions/{solution_id}/dislike`
- **Headers**: `Authorization: Bearer your_auth_token_here` (Admin only)
- **Response**:
  ```json
  {
    "likes": 1,
    "dislikes": 0
  }
  ```

## Setup Instructions (Locally)

You can try out the deployed version using the admin credentials: username `admin1` and password `1`. Alternatively, you can follow the provided setup instructions to run the application locally. Here's the link: [Deployed Version](https://techrar.ahmed-haz.com/).

### Clone the Repository
```bash
git clone https://github.com/AhmadAlhazmi75/techrar-assessment
cd techrar-assessment
```

- Note that the requirements.txt file includes many libraries due to our use of the CrewAI platform, which has its dependencies. Apart from that, our main dependencies are simple and include Django, Django-Ninja, and a few others.

### Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# Rename .env.example to .env and fill in required keys
python manage.py migrate
python manage.py runserver
```

#### Optional: Create an Admin User
```bash
python manage.py createsuperuser
```

### Frontend Setup
```bash
cd frontend/ai-app
npm install
npm run dev
```

## Setup Instructions (For Deployment)

-The whole system is deployed on Railway,
to setup the system on Railway, you can follow the steps below:

-First step is to Seperate the backend and frontend into two different git repositories

- Frontend:
  
1. In api.ts, change the URL to your backend domain.
2. Create a new Railway project.
3. Use git option in railway to connect to the frontend repository.
4. Select the repo, and that's it!.

-Backend:

1. Prepare the 'settings.py' file to be ready for deployment by adding your domain to the allowed hosts, and adding the domain to the CORS_ALLOWED_ORIGINS, you may also connect to the database service.
2. On the root of the project, create a new file called 'Procfile' and add the following line to it:

```bash
web: python manage.py migrate && gunicorn chatbot_gpt.wsgi
```

3. On the same railway project, create a new service, from top right corner, click on "Create"
4. Use git option in railway to connect to the backend repository.
5. Select the repo, and add your environment variables.
6. Railway will automatically containerize the project, and deploy it.

## User Guide

### Chatbot
To use the chatbot, you'll need to be logged in, so create an account first. Once authenticated, navigate to `/chat` or find it in the navbar. The page includes four sections: a dropdown to select from available system documentations, a chat area for messages and AI responses, a suggestions area with example queries, and a textbox to send your messages.

### Ticketing System
To access the ticketing system, click the ticket icon at the bottom-right corner. After logging in, you can create a ticket by filling in the title, description, priority, and system choices. An AI-generated solution will appear, and the ticket is sent to an admin-only page where tickets can be liked or disliked by admins.


## Demo 

[Watch the demo video](https://www.youtube.com/watch?v=sWO7eoDrM4k)
