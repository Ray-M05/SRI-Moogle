import ResultItem from './ResultItem';

export default function ResultList({ results, suggestions }) {
  // Si no hay resultados pero se realizó la búsqueda
  if (!results || results.length === 0) {
    return null; // O podríamos retornar un div de "No resultados"
  }

  const hasSuggestions = suggestions && Object.keys(suggestions).length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-fade-in-up">
      
      {/* Caja de sugerencias estilo "Quizás quisiste decir..." */}
      {hasSuggestions && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg text-left shadow-sm">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <strong>¿Quisiste buscar?</strong>
          </p>
          <ul className="mt-2 ml-8 list-disc list-inside">
            {Object.entries(suggestions).map(([bad, good]) => (
              <li key={bad}>
                En lugar de <span className="line-through opacity-70 text-red-600">{bad}</span>, buscamos: <span className="font-bold text-green-700">{good}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Lista de resultados */}
      <div className="space-y-6 flex flex-col items-stretch">
        <div className="text-gray-500 text-sm text-left px-2 border-b pb-2">
          Se encontraron <strong>{results.length}</strong> resultados.
        </div>
        
        {results.map((result, idx) => (
          <ResultItem key={idx} result={result} />
        ))}
      </div>
    </div>
  );
}