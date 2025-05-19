from app.core.database import get_connection
from app.schemas.fornecedor import FornecedorCreate, FornecedorUpdate
from typing import List, Optional, Tuple

def get_all() -> List[dict]:
    con = get_connection()
    cur = con.cursor()
    cur.execute("SELECT * FROM FORNECEDOR")
    colunas = [desc[0] for desc in cur.description]
    rows = [dict(zip(colunas, row)) for row in cur.fetchall()]
    cur.close()
    con.close()
    return rows

def get_by_id(fornecedor_id: int) -> Optional[dict]:
    con = get_connection()
    cur = con.cursor()
    cur.execute("SELECT * FROM FORNECEDOR WHERE CODIGO_FORNECEDOR = ?", (fornecedor_id,))
    row = cur.fetchone()
    colunas = [desc[0] for desc in cur.description]
    result = dict(zip(colunas, row)) if row else None
    cur.close()
    con.close()
    return result

def create(fornecedor: FornecedorCreate) -> dict:
    con = get_connection()
    cur = con.cursor()
    sql = """
    INSERT INTO FORNECEDOR (NOME, TIPO, CNPJ, CEP, FANTASIA, IE, ENDERECO, BAIRRO, NUMERO, CODIGO_CIDADE, TELEFONE, DATA, EMAIL, CODIGO_GRUPO)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING CODIGO_FORNECEDOR
    """
    params = (
        fornecedor.NOME, fornecedor.TIPO, fornecedor.CNPJ, fornecedor.CEP,
        fornecedor.FANTASIA, fornecedor.IE, fornecedor.ENDERECO, fornecedor.BAIRRO,
        fornecedor.NUMERO, fornecedor.CODIGO_CIDADE, fornecedor.TELEFONE,
        fornecedor.DATA, fornecedor.EMAIL, fornecedor.CODIGO_GRUPO
    )
    cur.execute(sql, params)
    new_id = cur.fetchone()[0]
    con.commit()
    cur.close()
    con.close()
    return get_by_id(new_id)

def update(fornecedor_id: int, fornecedor: FornecedorUpdate) -> Optional[dict]:
    con = get_connection()
    cur = con.cursor()
    sql = """
    UPDATE FORNECEDOR SET NOME=?, TIPO=?, CNPJ=?, CEP=?, FANTASIA=?, IE=?, ENDERECO=?, BAIRRO=?, NUMERO=?, CODIGO_CIDADE=?, TELEFONE=?, DATA=?, EMAIL=?, CODIGO_GRUPO=?
    WHERE CODIGO_FORNECEDOR=?
    """
    params = (
        fornecedor.NOME, fornecedor.TIPO, fornecedor.CNPJ, fornecedor.CEP,
        fornecedor.FANTASIA, fornecedor.IE, fornecedor.ENDERECO, fornecedor.BAIRRO,
        fornecedor.NUMERO, fornecedor.CODIGO_CIDADE, fornecedor.TELEFONE,
        fornecedor.DATA, fornecedor.EMAIL, fornecedor.CODIGO_GRUPO, fornecedor_id
    )
    cur.execute(sql, params)
    con.commit()
    cur.close()
    con.close()
    return get_by_id(fornecedor_id)

def delete(fornecedor_id: int) -> bool:
    con = get_connection()
    cur = con.cursor()
    cur.execute("DELETE FROM FORNECEDOR WHERE CODIGO_FORNECEDOR=?", (fornecedor_id,))
    con.commit()
    success = cur.rowcount > 0
    cur.close()
    con.close()
    return success


def buscar_fornecedores(limit: int = 20, offset: int = 0, busca: str = "") -> Tuple[List[dict], int]:
    con = get_connection()
    cur = con.cursor()
    params = []
    where = ""
    if busca:
        where = "WHERE NOME CONTAINING ? OR CNPJ CONTAINING ?"
        params.extend([busca, busca])

    # 1. Conta total (com filtro de busca, se houver)
    count_sql = f"SELECT COUNT(*) FROM FORNECEDOR {where}"
    cur.execute(count_sql, params)
    total = cur.fetchone()[0]

    # 2. Busca paginada
    # Firebird usa ROWS X TO Y (inclusive)
    sql = f"SELECT * FROM FORNECEDOR {where} ROWS ? TO ?"
    params_paginado = params + [offset + 1, offset + limit]
    cur.execute(sql, params_paginado)
    colunas = [desc[0] for desc in cur.description]
    rows = [dict(zip(colunas, row)) for row in cur.fetchall()]

    cur.close()
    con.close()
    return rows, total