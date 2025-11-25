import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsDashboard } from './components/ResultsDashboard';
import { analyzeReviews } from './services/geminiService';
import { AnalysisResult, AppState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleAnalyze = async (brand: string, text: string) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg('');
    try {
      const result = await analyzeReviews(text, brand);
      setAnalysisResult(result);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setAppState(AppState.ERROR);
      setErrorMsg(err.message || "Si è verificato un errore durante l'analisi delle recensioni.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Input */}
          <section className="max-w-3xl mx-auto w-full">
            <InputSection 
              onAnalyze={handleAnalyze} 
              isLoading={appState === AppState.ANALYZING} 
            />
          </section>

          {/* Section 2: Error Feedback */}
          {appState === AppState.ERROR && (
            <div className="max-w-3xl mx-auto w-full bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-red-800 font-medium">Errore Analisi</h4>
                <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Section 3: Results */}
          {appState === AppState.SUCCESS && analysisResult && (
            <section className="w-full">
               <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Risultati Analisi: <span className="text-blue-600">{analysisResult.brandName}</span>
                </h2>
                <button 
                  onClick={() => {
                    setAppState(AppState.IDLE);
                    setAnalysisResult(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Nuova Analisi
                </button>
               </div>
               <ResultsDashboard data={analysisResult} />
            </section>
          )}

          {/* Empty State / Intro */}
          {appState === AppState.IDLE && (
            <div className="text-center mt-12 opacity-60">
              <p className="text-gray-500">
                Inserisci dati per iniziare l'analisi strategica.
                <br />
                Supporta analisi multi-regionale e identificazione automatica dei pattern.
              </p>
            </div>
          )}

        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} RetailPulse AI. Powered by Google Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;