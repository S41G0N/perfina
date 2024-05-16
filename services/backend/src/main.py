from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # NEW


app = FastAPI()

# ALLOW CONNECTIONS FROM VUE FRONTEND
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI()

@app.get("/")
def home():
    return "Hello, World!"
