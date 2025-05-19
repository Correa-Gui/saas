from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class FornecedorBase(BaseModel):
    NOME: str
    TIPO: Optional[str] = None
    CNPJ: Optional[str] = None
    CEP: Optional[str] = None
    FANTASIA: Optional[str] = None
    IE: Optional[str] = None
    ENDERECO: Optional[str] = None
    BAIRRO: Optional[str] = None
    NUMERO: Optional[str] = None
    CODIGO_CIDADE: Optional[int] = None
    TELEFONE: Optional[str] = None
    DATA: Optional[date] = None
    EMAIL: Optional[str] = None
    CODIGO_GRUPO: Optional[int] = None

class FornecedorCreate(FornecedorBase):
    NOME: str

class FornecedorUpdate(FornecedorBase):
    pass

class FornecedorOut(FornecedorBase):
    CODIGO_FORNECEDOR: int
