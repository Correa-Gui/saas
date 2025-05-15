from typing import List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.firebird import get_conn

router = APIRouter(prefix="/api/fornecedores", tags=["fornecedores"])

class Fornecedor(BaseModel):
    ID: int
    NOME: str
    CNPJ: Optional[str] = None
    TELEFONE: Optional[str] = None
    CONTATO: Optional[str] = None

class FornecedorCreate(BaseModel):
    NOME: str
    CNPJ: Optional[str] = None
    TELEFONE: Optional[str] = None
    CONTATO: Optional[str] = None

@router.get("/", response_model=List[Fornecedor])
def list_fornecedores():
    con = get_conn()
    cur = con.cursor()
    cur.execute("SELECT ID, NOME, CNPJ, TELEFONE, CONTATO FROM FORNECEDOR")
    rows = cur.fetchall()
    cols = [d[0].strip() for d in cur.description]
    con.close()
    return [dict(zip(cols, row)) for row in rows]

@router.get("/{id}", response_model=Fornecedor)
def get_fornecedor(id: int):
    con = get_conn()
    cur = con.cursor()
    cur.execute("SELECT ID, NOME, CNPJ, TELEFONE, CONTATO FROM FORNECEDOR WHERE ID = ?", (id,))
    row = cur.fetchone()
    con.close()
    if not row:
        raise HTTPException(404, "Fornecedor não encontrado")
    cols = [d[0].strip() for d in cur.description]
    return dict(zip(cols, row))

@router.post("/", response_model=Fornecedor, status_code=201)
def create_fornecedor(f: FornecedorCreate):
    con = get_conn()
    cur = con.cursor()
    cur.execute(
        "INSERT INTO FORNECEDOR (NOME, CNPJ, TELEFONE, CONTATO) VALUES (?, ?, ?, ?) RETURNING ID",
        (f.NOME, f.CNPJ, f.TELEFONE, f.CONTATO)
    )
    new_id = cur.fetchone()[0]
    con.commit()
    con.close()
    return {**f.dict(), "ID": new_id}

@router.put("/{id}", response_model=Fornecedor)
def update_fornecedor(id: int, f: FornecedorCreate):
    con = get_conn()
    cur = con.cursor()
    cur.execute(
        "UPDATE FORNECEDOR SET NOME = ?, CNPJ = ?, TELEFONE = ?, CONTATO = ? WHERE ID = ?",
        (f.NOME, f.CNPJ, f.TELEFONE, f.CONTATO, id)
    )
    if cur.rowcount == 0:
        con.close()
        raise HTTPException(404, "Fornecedor não encontrado")
    con.commit()
    cur.execute("SELECT ID, NOME, CNPJ, TELEFONE, CONTATO FROM FORNECEDOR WHERE ID = ?", (id,))
    row = cur.fetchone()
    cols = [d[0].strip() for d in cur.description]
    con.close()
    return dict(zip(cols, row))

@router.delete("/{id}", status_code=204)
def delete_fornecedor(id: int):
    con = get_conn()
    cur = con.cursor()
    cur.execute("DELETE FROM FORNECEDOR WHERE ID = ?", (id,))
    if cur.rowcount == 0:
        con.close()
        raise HTTPException(404, "Fornecedor não encontrado")
    con.commit()
    con.close()
