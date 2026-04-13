# Plan de Transformación Arquitectónica: SRI-Moogle (FastAPI + React)

Este documento detalla el plan paso a paso para estructurar y escalar el Sistema de Recuperación de Información (SRI) a una Arquitectura Cliente-Servidor robusta e interactiva.

## Fase 1: Refactorización del Backend (Python - FastAPI)
Convertir los scripts actuales en una API REST que React pueda consumir.
1. **Framework Web:** Mover a **FastAPI** por su alto rendimiento y modernidad.
2. **Modularización:**
   * Crear la carpeta `backend/` y mover los archivos Python allí.
   * Separar responsabilidades:
     * `backend/core/index.py` (Lógica para indexar los textos).
     * `backend/core/search.py` (Algoritmo de búsqueda, TF-IDF, Similitud Coseno, etc.).
     * `backend/api/main.py` (Controladores de la API: endpoints como `/search?q=gato`).
3. **Manejo de Datos:** Colocar los `.txt` en una carpeta estandarizada como `backend/data/corpus/`.

## Fase 2: Configuración del Frontend (React)
Construir una aplicación SPA (Single Page Application) rápida y robusta.
1. **Inicialización:** Crear el proyecto con **Vite + React**.
2. **Estructura de Componentes:**
   * `frontend/src/components/`
     * `SearchBar.jsx` (Barra de búsqueda principal).
     * `ResultList.jsx` (Contenedor de resultados).
     * `ResultItem.jsx` (Tarjeta individual de cada documento encontrado).
     * `DocumentViewer.jsx` (Modal o vista para leer el documento completo).
3. **Servicios (Arquitectura Limpia):**
   * Crear un archivo `frontend/src/services/api.js` que se encargue exclusivamente de hacer las peticiones `fetch` o `axios` al backend de FastAPI.

## Fase 3: Conexión y Estado (Robustez)
1. **Manejo de Estado Personalizado (Hooks):** Crear un hook `useSearch.js` que maneje los estados de carga (`isLoading`), errores (`isError`), y los datos (`results`).
2. **CORS:** Configurar el backend en FastAPI (middleware CORS) para aceptar peticiones de la app de React (usualmente corriendo en `localhost:5173`).

## Fase 4: Mejoras "Premium" para el Portafolio
* **UI/UX Limpia:** Usar Tailwind CSS para estilos modernos e interfaz de buscador.
* **Snippets y Resaltado (Highlighting):** Modificar el backend para devolver un fragmento (snippet) del texto donde aparece la palabra buscada.
* **Manejo de Carga:** Mostrar un "Skeleton loading" o un spinner mientras se procesa la búsqueda.

---

## 📂 Estructura Final del Proyecto

```text
SRI-Moogle/
├── backend/                  # Código Python refactorizado
│   ├── api/
│   │   └── main.py           # Endpoint FastAPI
│   ├── core/
│   │   ├── index.py          # Lógica de indexación
│   │   └── search.py         # Lógica de ranking/búsqueda
│   ├── data/
│   │   ├── stop_words.txt
│   │   └── corpus/           # Textos de Edgar Allan Poe
│   └── requirements.txt      # Dependencias
│
└── frontend/                 # Nueva aplicación React (Vite)
    ├── public/
    ├── src/
    │   ├── components/       # Componentes visuales
    │   ├── hooks/            # useSearch.js
    │   ├── services/         # peticiones al backend (api.js)
    │   ├── App.jsx           # Vista principal
    │   └── index.css         # Estilos globales (Tailwind)
    └── package.json
```
