import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultList from './components/ResultList';
import DocumentViewer from './components/DocumentViewer';
import { useSearch } from './hooks/useSearch';

function App() {
  const { results, suggestions, isLoading, error, performSearch } = useSearch();
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-full font-sans overflow-x-hidden selection:bg-blue-200 relative">
      {/* Fondo de adorno superior */}
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent -z-10 pointer-events-none"></div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
        
        {/* Header Título */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-900 drop-shadow-sm">
            SRI <span className="text-blue-500">Moogle</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Motor de búsqueda vectorial y semántico usando los textos oscuros de Edgar Allan Poe.
          </p>
        </div>

        {/* Componente Buscador */}
        <SearchBar onSearch={performSearch} isLoading={isLoading} />
        
        {/* Estado Error */}
        {error && (
          <div className="w-full max-w-2xl mt-4 p-4 text-red-700 bg-red-50 border-l-4 border-red-500 rounded text-left shadow-sm">
            <p className="font-bold">Error de conexión</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Resultados */}
        {results && results.length > 0 ? (
           <ResultList results={results} suggestions={suggestions} onSelectDocument={setSelectedDocument} />
        ) : (
           <div className="mt-16 text-center text-gray-400 max-w-md mx-auto italic">
              Empieza escribiendo algo como "asesino", "razón" o "gato" para ver cómo el algoritmo TD-IDF y la distancia Levenshtein rankean los resultados.
           </div>
        )}
        
      </main>

      {/* Modal / Visor de Documento */}
      {selectedDocument && (
        <DocumentViewer 
          documentName={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </div>
  );
}

export default App;