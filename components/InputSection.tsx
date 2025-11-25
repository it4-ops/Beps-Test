import React, { useState } from 'react';
import { Search, Sparkles, ClipboardCopy } from 'lucide-react';
import { generateMockReviews } from '../services/mockData';

interface InputSectionProps {
  onAnalyze: (brand: string, text: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [brand, setBrand] = useState('Elettronica Italia');
  const [reviews, setReviews] = useState('');

  const handleDemoLoad = () => {
    const mock = generateMockReviews(brand);
    setReviews(mock);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brand && reviews) {
      onAnalyze(brand, reviews);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Search className="w-5 h-5 mr-2 text-blue-600" />
          Configurazione Analisi
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Inserisci il nome della catena e incolla le recensioni (CSV o testo) oppure usa i dati demo.
        </p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Catena / Brand
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Es. MediaWorld, Esselunga, Zara..."
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">
                Testo Recensioni (Raw Data)
              </label>
              <button
                type="button"
                onClick={handleDemoLoad}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <ClipboardCopy className="w-3 h-3 mr-1" />
                Carica Dati Demo (Simulazione)
              </button>
            </div>
            <textarea
              id="reviews"
              rows={6}
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono text-sm"
              placeholder="Incolla qui le recensioni raccolte da Google Maps..."
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !reviews}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${
                isLoading || !reviews
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analisi AI in corso...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Genera Analisi SWOT Nazionale
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};