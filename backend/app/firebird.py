# backend/app/firebird.py

import os
import firebirdsql
from dotenv import load_dotenv, find_dotenv

# 1) Carrega o .env mais próximo (vai subir pastas até achar backend/.env)
load_dotenv(find_dotenv())

# 2) Lê as variáveis de conexão
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3050")
DB_USER = os.getenv("DB_USER", "SYSDBA")
DB_PASS = os.getenv("DB_PASS", "masterkey")
DB_FILE = os.getenv("DB_FILE")  # Exemplo: "DADOS.fdb" ou caminho absoluto

# 3) Diretório base do backend
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def get_conn():
    # 4) Monta o caminho absoluto para o .fdb
    if os.path.isabs(DB_FILE):
        db_path = DB_FILE
    else:
        db_path = os.path.join(BASE_DIR, DB_FILE)

    # 5) DEBUG: mostra o caminho que vai ser usado
    print(f"DEBUG: abrindo arquivo de banco em -> {db_path}")

    # 6) Retorna a conexão (pure Python, sem fbclient.dll)
    return firebirdsql.connect(
        host=DB_HOST,
        port=int(DB_PORT),
        database=db_path,
        user=DB_USER,
        password=DB_PASS,
        charset="UTF8"
    )
