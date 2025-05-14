from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./bancas.db"
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    # cria as tabelas
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
