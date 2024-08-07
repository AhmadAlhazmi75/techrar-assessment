from ninja import Schema
from typing import Optional, List
from datetime import datetime

class TicketIn(Schema):
    title: str
    description: str
    priority: str

class AISolutionOut(Schema):
    id: int
    ticket_id: int
    solution: str
    created_at: datetime
    likes: int
    dislikes: int

class TicketOut(Schema):
    id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    priority: str
    status: str
    ai_solutions: Optional[List[AISolutionOut]] = None

class AISolutionIn(Schema):
    ticket_id: int
