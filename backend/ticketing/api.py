from ninja import Router
from django.shortcuts import get_object_or_404
from .models import Ticket, AISolution
from .schemas import TicketIn, TicketOut, AISolutionOut
from crewai_api.crewai_setup import process_prompt, SYSTEM_PDF_MAP
from typing import List
from ninja.errors import HttpError
from authentication.auth import AuthBearer

router = Router()
auth = AuthBearer()

@router.post("/tickets", response=TicketOut, auth=auth)
def create_ticket(request, ticket_in: TicketIn):
    """
    Create a new ticket.

    Args:
        request: The HTTP request object.
        ticket_in (TicketIn): The input schema for creating a ticket.

    Returns:
        TicketOut: The output schema representing the created ticket.
    """
    ticket = Ticket.objects.create(
        title=ticket_in.title,
        description=ticket_in.description,
        priority=ticket_in.priority,
        assigned_to=request.auth
    )
    return TicketOut.from_orm(ticket)

@router.get("/tickets/{ticket_id}", response=TicketOut)
def get_ticket(request, ticket_id: int):
    """
    Retrieve a ticket by its ID.

    Args:
        request: The HTTP request object.
        ticket_id (int): The ID of the ticket to retrieve.

    Returns:
        TicketOut: The output schema representing the retrieved ticket.
    """
    ticket = get_object_or_404(Ticket, id=ticket_id)
    return ticket

@router.post("/tickets/{ticket_id}/ai-solution", response=AISolutionOut)
def generate_ai_solution(request, ticket_id: int, system: str = "system1"):
    """
    Generate an AI solution for a ticket.

    Args:
        request: The HTTP request object.
        ticket_id (int): The ID of the ticket for which to generate a solution.
        system (str): The system to use for generating the solution (default is "system1").

    Returns:
        AISolutionOut: The output schema representing the generated AI solution.
    """
    ticket = get_object_or_404(Ticket, id=ticket_id)
    prompt = f"Provide a solution for the following ticket: {ticket.description}"

    if system not in SYSTEM_PDF_MAP:
        raise HttpError(400, f"Invalid system. Available systems: {', '.join(SYSTEM_PDF_MAP.keys())}")

    ai_solution = process_prompt(system, prompt)
    solution = AISolution.objects.create(ticket=ticket, solution=ai_solution)
    return AISolutionOut.from_orm(solution)

@router.get("/tickets", response=List[TicketOut])
def get_all_tickets(request):
    """
    Retrieve all tickets.

    Args:
        request: The HTTP request object.

    Returns:
        List[TicketOut]: A list of output schemas representing all tickets.
    """
    tickets = Ticket.objects.all().select_related('ai_solution')
    return [TicketOut.from_orm(ticket) for ticket in tickets]

@router.post("/ai-solutions/{solution_id}/like", auth=auth)
def like_ai_solution(request, solution_id: int):
    """
    Like or unlike an AI solution.

    Args:
        request: The HTTP request object.
        solution_id (int): The ID of the AI solution to like or unlike.

    Returns:
        dict: A dictionary containing the updated likes and dislikes count.
    """
    if not request.auth.is_superuser:
        raise HttpError(403, "Only admins can like or dislike solutions")
    solution = get_object_or_404(AISolution, id=solution_id)
    if solution.likes > 0:
        solution.likes = 0  # Unlike
    else:
        solution.likes = 1
        solution.dislikes = 0
    solution.save()
    return {"likes": solution.likes, "dislikes": solution.dislikes}

@router.post("/ai-solutions/{solution_id}/dislike", auth=auth)
def dislike_ai_solution(request, solution_id: int):
    """
    Dislike or undislike an AI solution.

    Args:
        request: The HTTP request object.
        solution_id (int): The ID of the AI solution to dislike or undislike.

    Returns:
        dict: A dictionary containing the updated likes and dislikes count.
    """
    if not request.auth.is_superuser:
        raise HttpError(403, "Only admins can like or dislike solutions")
    solution = get_object_or_404(AISolution, id=solution_id)
    if solution.dislikes > 0:
        solution.dislikes = 0  # Undislike
    else:
        solution.dislikes = 1
        solution.likes = 0
    solution.save()
    return {"likes": solution.likes, "dislikes": solution.dislikes}
