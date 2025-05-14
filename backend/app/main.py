# backend/app/main.py

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select, Session
from typing import List

from .database import init_db, get_session
from .models import Banca, Transaction
from .schemas import (
    BancaRead,        # resposta com id
    BancaCreate,      # uso em POST
    BancaUpdate,      # uso em PUT
    BancaReadWithBalance,
    TransactionCreate,
    TransactionRead
)

app = FastAPI(
    title="API de Gestão de Bancas",
    docs_url="/docs",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
def on_startup():
    init_db()


# ─── CRUD de Banca ────────────────────────────────────────────────────────────

@app.get("/bancas", response_model=List[BancaRead])
def list_bancas(session: Session = Depends(get_session)):
    bancas = session.exec(select(Banca)).all()
    return bancas

@app.post("/bancas", response_model=BancaRead, status_code=201)
def create_banca(banca: BancaCreate, session: Session = Depends(get_session)):
    new = Banca.from_orm(banca)
    session.add(new)
    session.commit()
    session.refresh(new)
    return new

@app.get("/bancas/{banca_id}", response_model=BancaRead)
def get_banca(banca_id: int, session: Session = Depends(get_session)):
    banca = session.get(Banca, banca_id)
    if not banca:
        raise HTTPException(404, "Banca não encontrada")
    return banca

@app.put("/bancas/{banca_id}", response_model=BancaRead)
def update_banca(banca_id: int, banca: BancaUpdate, session: Session = Depends(get_session)):
    existing = session.get(Banca, banca_id)
    if not existing:
        raise HTTPException(404, "Banca não encontrada")
    banca_data = banca.dict(exclude_unset=True)
    for key, val in banca_data.items():
        setattr(existing, key, val)
    session.add(existing)
    session.commit()
    session.refresh(existing)
    return existing

@app.delete("/bancas/{banca_id}", status_code=204)
def delete_banca(banca_id: int, session: Session = Depends(get_session)):
    existing = session.get(Banca, banca_id)
    if not existing:
        raise HTTPException(404, "Banca não encontrada")
    session.delete(existing)
    session.commit()
    return None


# ─── Transações e Saldo ─────────────────────────────────────────────────────────

@app.post("/transactions", response_model=TransactionRead, status_code=201)
def create_transaction(tx: TransactionCreate, session: Session = Depends(get_session)):
    if not session.get(Banca, tx.banca_id):
        raise HTTPException(404, "Banca não encontrada")
    new = Transaction.from_orm(tx)
    session.add(new)
    session.commit()
    session.refresh(new)
    return new

@app.get("/bancas/{banca_id}/transactions", response_model=List[TransactionRead])
def list_transactions(banca_id: int, session: Session = Depends(get_session)):
    if not session.get(Banca, banca_id):
        raise HTTPException(404, "Banca não encontrada")
    stmt = select(Transaction).where(Transaction.banca_id == banca_id).order_by(Transaction.created_at.desc())
    return session.exec(stmt).all()

@app.get("/bancas/{banca_id}/balance", response_model=float)
def get_balance(banca_id: int, session: Session = Depends(get_session)):
    banca = session.get(Banca, banca_id)
    if not banca:
        raise HTTPException(404, "Banca não encontrada")
    stmt = select(Transaction.amount).where(Transaction.banca_id == banca_id)
    amounts = session.exec(stmt).all()
    return banca.initial_value + sum(amounts)

@app.get("/bancas/{banca_id}/full", response_model=BancaReadWithBalance)
def get_banca_full(banca_id: int, session: Session = Depends(get_session)):
    banca = session.get(Banca, banca_id)
    if not banca:
        raise HTTPException(404, "Banca não encontrada")
    txs = session.exec(
        select(Transaction)
        .where(Transaction.banca_id == banca_id)
        .order_by(Transaction.created_at.desc())
    ).all()
    balance = banca.initial_value + sum(tx.amount for tx in txs)
    return BancaReadWithBalance(
        id=banca.id,
        bookmaker=banca.bookmaker,
        name=banca.name,
        initial_value=banca.initial_value,
        balance=balance,
        transactions=txs
    )
@app.get("/transactions", response_model=List[TransactionRead])
def list_all_transactions(session: Session = Depends(get_session)):
    stmt = select(Transaction).order_by(Transaction.created_at.desc())
    return session.exec(stmt).all()