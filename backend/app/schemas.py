# backend/app/schemas.py

from sqlmodel import SQLModel
from typing import Optional, List
from datetime import datetime

class BancaCreate(SQLModel):
    bookmaker: str
    name: str
    initial_value: float

class BancaRead(SQLModel):
    id: int
    bookmaker: str
    name: str
    initial_value: float

class BancaUpdate(SQLModel):
    bookmaker: Optional[str] = None
    name: Optional[str] = None
    initial_value: Optional[float] = None

class TransactionCreate(SQLModel):
    banca_id: int
    type: str  # 'deposit', 'withdrawal', 'bet', 'settlement', 'adjustment'
    amount: float
    description: Optional[str] = None

class TransactionRead(SQLModel):
    id: int
    banca_id: int
    type: str
    amount: float
    description: Optional[str]
    created_at: datetime

class BancaReadWithBalance(SQLModel):
    id: int
    bookmaker: str
    name: str
    initial_value: float
    balance: float
    transactions: List[TransactionRead]
