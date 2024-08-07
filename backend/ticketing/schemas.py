from ninja import Schema
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

class TicketIn(Schema):
    title: str
    description: str
    priority: str


class AISolutionOut(BaseModel):
    id: int
    solution: str
    created_at: datetime
    likes: int
    dislikes: int

    class Config:
        from_attributes = True

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AISolutionOut(BaseModel):
    id: int
    solution: str
    created_at: datetime
    likes: int
    dislikes: int

    class Config:
        from_attributes = True

class TicketOut(BaseModel):
    id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    priority: str
    status: str
    assigned_to: Optional[int] = None
    ai_solution: Optional[AISolutionOut] = None

    class Config:
        from_attributes = True

    @classmethod
    def from_orm(cls, ticket):
        return cls(
            id=ticket.id,
            title=ticket.title,
            description=ticket.description,
            created_at=ticket.created_at,
            updated_at=ticket.updated_at,
            priority=ticket.priority,
            status=ticket.status,
            assigned_to=ticket.assigned_to.id if ticket.assigned_to else None,
            ai_solution=AISolutionOut.from_orm(ticket.ai_solution) if hasattr(ticket, 'ai_solution') else None
        )
        
class AISolutionIn(Schema):
    ticket_id: int
