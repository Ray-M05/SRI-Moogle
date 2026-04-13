export default function ResultItem({ result }) {
  // Convertir score de string gigante a número corto (hasta 4 decimales) para que se vea bien
  const scoreParsed = typeof result.score === 'number' ? result.score.toFixed(4) : Number(result.score).toFixed(4);
  
  return (
    <article className="p-6 mb-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-left">
      <h3 className="text-2xl font-bold text-blue-700 mb-1 hover:underline cursor-pointer">
        {result.title}
      </h3>
      <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-4">
        Relevancia: {scoreParsed}
      </div>
      <p className="text-gray-700 leading-relaxed font-sans text-base">
         <span className="text-gray-400 mr-2 font-serif text-lg">"</span>
         <span dangerouslySetInnerHTML={{ __html: result.snippet.replace(/<[^>]*>?/gm, '') }}></span>
         <span className="text-gray-400 ml-2 font-serif text-lg">"</span>
      </p>
    </article>
  );
}