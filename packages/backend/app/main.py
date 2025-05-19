from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para dev local, libera tudo. Em produção, especifique o domínio do frontend!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# O resto do seu código (rotas, etc)

from fastapi import FastAPI
from app.api import fornecedores


app.include_router(fornecedores.router)
