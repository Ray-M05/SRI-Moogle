# SRI Moogle - Motor de Búsqueda Semántico

**SRI Moogle** es un Sistema de Recuperación de Información (SRI) Full-Stack diseñado para buscar y explorar una colección de cuentos oscuros de Edgar Allan Poe. Construido con una arquitectura cliente-servidor moderna, el proyecto implementa desde cero algoritmos clásicos de búsqueda matemática y procesamiento de lenguaje natural (NLP).

## Características Principales

### Backend
* **Algoritmo TF-IDF:** El corazón del buscador. Calcula la relevancia de cada documento basándose en la frecuencia de las palabras buscadas y su rareza en todo el corpus, descartando palabras comunes.
* **Sugerencias Ortográficas:** Implementa la Distancia de Levenshtein para detectar errores de tipeo y sugerir la palabra correcta si no se encontraron coincidencias exactas.
* **Procesamiento de Lenguaje Natural (NLP):** Utiliza NLTK para reducir las palabras a su raíz semántica. Por ejemplo, al buscar *"asesinatos"*, el motor es capaz de encontrar documentos que contengan *"asesino"*, *"asesinar"* o *"asesinado"*.
* **Generación de Snippets:** No solo devuelve el documento, sino que escanea el texto y extrae el fragmento exacto (snippet) de 30 palabras donde el término de búsqueda es más relevante.

### Frontend 
* **Diseño Minimalista e Intuitivo:** Interfaz limpia inspirada en motores de búsqueda modernos construida con React, Vite y Tailwind CSS.
* **Historial Inteligente:** Guarda las búsquedas recientes en el almacenamiento local y las muestra en un menú desplegable interactivo.
* **Visor de Documentos In-App:** Permite hacer clic en los resultados para leer el cuento completo directamente.

### Infraestructura y DevOps
* **Arquitectura de Microservicios:** Separación estricta entre la lógica de negocio/API (FastAPI) y la interfaz de usuario (React).
* **Dockerizado:** Listo para producción. Cuenta con contenedores configurados optimizados (incluyendo _Multi-Stage Builds_ para React + Nginx) orquestados mediante **Docker Compose**, lo que permite levantar todo el ecosistema con un solo comando.

##  Tecnologías Utilizadas
* **Backend:** Python 3.10, FastAPI, Uvicorn, NLTK, python-Levenshtein.
* **Frontend:** React.js, Vite, Tailwind CSS.
* **Despliegue:** Docker, Docker Compose, Nginx.

---