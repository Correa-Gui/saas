import os
import firebirdsql
from dotenv import load_dotenv, find_dotenv

# Carrega .env
load_dotenv(find_dotenv())

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = int(os.getenv("DB_PORT", "3050"))
DB_USER = os.getenv("DB_USER", "SYSDBA")
DB_PASS = os.getenv("DB_PASS", "masterkey")
DB_FILE = os.getenv("DB_FILE")  # Caminho para o .FDB

def get_connection():
    # Monta caminho absoluto se necessário
    if not os.path.isabs(DB_FILE):
        BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        DB_FILE_FINAL = os.path.join(BASE_DIR, DB_FILE)
    else:
        DB_FILE_FINAL = DB_FILE

    return firebirdsql.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_FILE_FINAL,
        user=DB_USER,
        password=DB_PASS,
        charset="UTF8"
    )
