from sqlalchemy.dialects import registry
from sqlalchemy import create_engine
import os

# REGISTRO MANUAL do plugin
registry.register("firebird.firebirdsql", "sqlalchemy_firebird.dialect", "FirebirdDialect_firebirdsql")

DATABASE_PATH = "C:/Projetos/Saas/packages/backend/app/DADOS.FDB"
DATABASE_URL = f"firebird+firebirdsql://SYSDBA:masterkey@localhost:3050/{DATABASE_PATH}"

if not os.path.exists(DATABASE_PATH):
    print(f"[ERRO] Arquivo de banco NÃO encontrado em: {DATABASE_PATH}")
else:
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("CONEXÃO OK! (registro manual)")
    except Exception as e:
        print("[ERRO] Falha ao conectar ao banco!")
        print(e)
