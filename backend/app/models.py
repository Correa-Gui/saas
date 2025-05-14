# backend/app/models.py
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    banca_id: int = Field(foreign_key="banca.id", index=True)
    type: str  # 'deposit', 'withdrawal', 'bet', 'settlement', 'adjustment'
    amount: float
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # relationship back to banca (opcional, se quiser carregar juntas)
    banca: "Banca" = Relationship(back_populates="transactions")


class Banca(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bookmaker: str
    name: str
    initial_value: float

    transactions: List[Transaction] = Relationship(back_populates="banca")
