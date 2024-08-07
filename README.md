# Techrar Assessment Project

## Table of Contents
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Blocks](#project-blocks)
  - [Authentication](#authentication)
  - [CrewAI-Powered Question Answering API](#crewai-powered-question-answering-api)
  - [Ticketing System](#ticketing-system)
- [Setup Instructions](#setup-instructions)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
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

#### Authentication Flow
1. **Registration**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login`
3. **Logout**: `POST /api/auth/logout`
4. **Get User Info**: `GET /api/auth/me`

#### Token Usage
Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### Security Features
- Password validation
- Cryptographically secure token generation
- Duplicate username and email prevention

#### User Roles
- `is_admin` field for role-based access control

#### Implementation Details
- Custom `Token` model
- Custom `AuthBearer` class for token validation
- Built on Django Ninja

### CrewAI-Powered Question Answering API

#### API Endpoint
- **Ask a Question**: `POST /ask`
  - Input: `system`, `prompt`
  - Output: Answer or error message

#### Implementation Details
- `api.py`: API endpoint definition
- `crewai_setup.py`: CrewAI environment setup

#### Usage Notes
- Ensure PDF documentation is in the `media/` directory
- Valid systems: "system1", "system2", "system3"
- Set `OPENAI_API_KEY` environment variable

#### Error Handling
Handles various scenarios including invalid input, missing files, and API issues

### Ticketing System

#### Models
- **Ticket**: title, description, priority, status, etc.
- **AISolution**: linked to Ticket, contains AI-generated solution

#### API Endpoints
- Create Ticket: `POST /tickets`
- Get Ticket: `GET /tickets/{ticket_id}`
- Generate AI Solution: `POST /tickets/{ticket_id}/ai-solution`
- Get All Tickets: `GET /tickets`
- Like AI Solution: `POST /ai-solutions/{solution_id}/like`
- Dislike AI Solution: `POST /ai-solutions/{solution_id}/dislike`

#### Features
- Ticket management
- AI-powered solutions
- Solution rating
- User assignment
- Flexible system selection

#### Usage Notes
- Integrates with CrewAI for AI solutions
- Authentication required for ticket creation
- Admin privileges for solution rating

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
