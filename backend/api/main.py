import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

from core.index import DocumentIndexer
from core.search import SearchEngine

app = FastAPI(title="SRI-Moogle API", description="Buscador de documentos", version="1.0.0")

# Permitir CORS (para nuestro frontend en React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción usar listado de dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicialización y Carga (Se ejecuta cuando arranca FastAPI)
indexer = DocumentIndexer()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_DIR = os.path.join(BASE_DIR, "data", "corpus")
STOP_WORDS_PATH = os.path.join(BASE_DIR, "data", "stop_words.txt")

# Cargamos todo al arrancar
print("Inicializando Motor de Búsqueda...")
indexer.cargar_stop_words(STOP_WORDS_PATH)
if os.path.exists(INDEX_DIR):
    indexer.cargar_documentos(INDEX_DIR)
    indexer.calcular_umbral()
    indexer.construir_indices()
    print(f"Indexados {len(indexer.documentos)} documentos.")
else:
    print(f"⚠️ ¡Atención! Directorio de corpus no encontrado: {INDEX_DIR}")

engine = SearchEngine(indexer)


# Modelos de Respuesta (Pydantic para la documentación de FastAPI)
class SearchResultItem(BaseModel):
    document: str
    title: str
    score: float
    snippet: str

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResultItem]
    suggestions: Dict[str, str]
    total_found: int


@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bienvenido a SRI-Moogle API. Navega a /docs para la documentación."}


@app.get("/api/search", response_model=SearchResponse, tags=["Search"])
def search_documents(q: str = Query(..., description="Query terms to search for")):
    """
    Realiza la búsqueda en todos los documentos indexados.
    Retorna resultados ordenados por relevancia y sugerencias de corrección ortográfica (Levenshtein).
    """
    resultados, sugerencias = engine.query(q)
    
    return {
        "query": q,
        "results": resultados,
        "suggestions": sugerencias,
        "total_found": len(resultados)
    }
