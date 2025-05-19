from sqlalchemy import Column, Integer, String, Date
from app.core.database import Base

class Fornecedor(Base):
    __tablename__ = "FORNECEDOR"

    CODIGO_FORNECEDOR = Column(Integer, primary_key=True, index=True)
    NOME = Column(String(120), nullable=False)
    TIPO = Column(String(20), nullable=False)
    CNPJ = Column(String(18), nullable=False)
    IE = Column(String(20))
    ENDERECO = Column(String(120))
    BAIRRO = Column(String(60))
    NUMERO = Column(String(10))
    CEP = Column(String(9), nullable=False)
    CODIGO_CIDADE = Column(Integer)
    TELEFONE = Column(String(20))
    DATA = Column(Date)
    EMAIL = Column(String(120))
