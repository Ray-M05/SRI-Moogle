export default function ResultItem({ result, onSelectDocument }) {
  // Convertir score de string gigante a número corto (hasta 4 decimales) para que se vea bien
  const scoreParsed = typeof result.score === 'number' ? result.score.toFixed(4) : Number(result.score).toFixed(4);
  
  return (
    <article 
      onClick={() => onSelectDocument(result.document)}
      className="p-6 mb-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left cursor-pointer group"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-blue-700 mb-1 group-hover:underline group-hover:text-blue-800">
          {result.title}
        </h3>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 flex items-center rounded uppercase tracking-wider">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-1 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Relevancia: {scoreParsed}
        </span>
      </div>
      
      <p className="text-gray-700 leading-relaxed font-sans text-base mt-3">
         <span className="text-gray-400 mr-2 font-serif text-lg">"</span>
         <span dangerouslySetInnerHTML={{ __html: result.snippet.replace(/<[^>]*>?/gm, '') }}></span>
         <span className="text-gray-400 ml-2 font-serif text-lg">"</span>
      </p>
    </article>
  );
}