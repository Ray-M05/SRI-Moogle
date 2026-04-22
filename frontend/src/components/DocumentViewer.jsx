import { useEffect, useState } from 'react';
import { getDocumentContent } from '../services/api';

export default function DocumentViewer({ documentName, onClose }) {
  const [docData, setDocData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoc = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getDocumentContent(documentName);
        setDocData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoc();
    
    // Cerrar con Escape
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [documentName, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col cursor-default transform transition-all"
        onClick={(e) => e.stopPropagation()} // Evitar cerrar si hacen click dentro del modal
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {docData ? docData.title : 'Cargando documento...'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo del Documento */}
        <div className="p-8 overflow-y-auto flex-1 text-gray-800 font-serif leading-loose text-lg whitespace-pre-wrap">
          {isLoading && (
             <div className="flex flex-col justify-center items-center h-full text-gray-400 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p>Leyendo documento de Edgar Allan Poe...</p>
             </div>
          )}
          {error && <p className="text-red-500 font-sans text-center mt-10 font-medium">{error}</p>}
          {docData && docData.content}
        </div>
      </div>
    </div>
  );
}