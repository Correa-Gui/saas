from fastapi import APIRouter, HTTPException, Query
from app.services import fornecedor as fornecedor_service
from app.schemas.fornecedor import FornecedorCreate, FornecedorUpdate, FornecedorOut
from typing import List


router = APIRouter(prefix="/fornecedores", tags=["Fornecedores"])

@router.get("/", response_model=dict)
def listar_fornecedores(limit: int = 20, offset: int = 0, busca: str = ""):
    # Query no banco, aplicar busca/filtro e paginação
    results, total = fornecedor_service.buscar_fornecedores(limit=limit, offset=offset, busca=busca)
    return {"data": results, "total": total}

@router.get("/{fornecedor_id}", response_model=FornecedorOut)
def obter(fornecedor_id: int):
    result = fornecedor_service.get_by_id(fornecedor_id)
    if not result:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    return result

@router.post("/", response_model=FornecedorOut)
def criar(fornecedor: FornecedorCreate):
    return fornecedor_service.create(fornecedor)

@router.put("/{fornecedor_id}", response_model=FornecedorOut)
def atualizar(fornecedor_id: int, fornecedor: FornecedorUpdate):
    result = fornecedor_service.update(fornecedor_id, fornecedor)
    if not result:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    return result

@router.delete("/{fornecedor_id}")
def deletar(fornecedor_id: int):
    success = fornecedor_service.delete(fornecedor_id)
    if not success:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    return {"ok": True}
