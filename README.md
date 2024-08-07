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
- SQLite: Data storage
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
- **Endpoint**: `POST /ask`
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
- **Endpoint**: `POST /tickets`
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
- **Endpoint**: `GET /tickets/{ticket_id}`
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
- **Endpoint**: `POST /tickets/{ticket_id}/ai-solution`
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
- **Endpoint**: `POST /ai-solutions/{solution_id}/like` or `/ai-solutions/{solution_id}/dislike`
- **Headers**: `Authorization: Bearer your_auth_token_here` (Admin only)
- **Response**:
  ```json
  {
    "likes": 1,
    "dislikes": 0
  }
  ```

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/AhmadAlhazmi75/techrar-assessment
cd techrar-assessment
```

### Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
# Rename .env.example to .env and fill in required keys
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

## Running the Application

With both backend and frontend servers running, access the application through your web browser.
