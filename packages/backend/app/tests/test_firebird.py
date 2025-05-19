import os
import firebirdsql
from dotenv import load_dotenv, find_dotenv

# Carrega variáveis de ambiente
load_dotenv(find_dotenv())

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = int(os.getenv("DB_PORT", "3050"))
DB_USER = os.getenv("DB_USER", "SYSDBA")
DB_PASS = os.getenv("DB_PASS", "masterkey")
DB_FILE = os.getenv("DB_FILE")

def main():
    # Monta caminho absoluto se necessário
    if not os.path.isabs(DB_FILE):
        BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        DB_FILE_FINAL = os.path.join(BASE_DIR, DB_FILE)
    else:
        DB_FILE_FINAL = DB_FILE

    print(f"Conectando ao banco: {DB_FILE_FINAL}")

    # Conexão
    con = firebirdsql.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_FILE_FINAL,
        user=DB_USER,
        password=DB_PASS,
        charset="UTF8"
    )
    cur = con.cursor()

    # Busca apenas as colunas (não retorna dados)
    cur.execute("SELECT * FROM FORNECEDOR WHERE 1=0")
    colunas = [desc[0] for desc in cur.description]

    print(os.path.exists("C:/Projetos/Saas/packages/backend/app/DADOS.FDB"))

    cur.close()
    con.close()


if __name__ == "__main__":
    main()
