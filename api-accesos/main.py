from fastapi import FastAPI

app = FastAPI(title="API Control de Accesos")

@app.get("/health")
def health():
    return {"status": "ok"}
