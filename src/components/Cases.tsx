import { useState } from 'react';
import { cases } from '../data';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

export default function Cases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentCase = cases[currentIndex];

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option.startsWith(currentCase.answer)) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentIndex(c => c + 1);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  if (currentIndex >= cases.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="text-6xl" role="img" aria-label="Trap">🕸️</div>
        <h2 className="text-3xl font-bold text-[#00a8e1]">¡Todos los casos resueltos!</h2>
        <p className="text-xl">Scooby-Galletas ganadas: <span className="font-bold text-[#00a8e1]">{score} 🦴</span> de {cases.length}</p>
        <button onClick={restart} className="px-6 py-3 bg-[#00a8e1] text-white font-bold rounded-xl hover:bg-[#007b99] transition-colors">
          Investigar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-[#00a8e1] flex items-center gap-2">
          <span className="text-3xl" role="img" aria-label="Ascot">👔</span> Casos de Fred
        </h2>
        <span className="bg-blue-100 text-[#00a8e1] px-3 py-1 rounded-full text-sm font-bold">
          Caso {currentIndex + 1} / {cases.length}
        </span>
      </div>
      <p className="text-slate-500 italic mb-6">"¡Bien pandilla, separémonos y resolvamos estos casos! Scooby hará cualquier cosa por una Scooby-Galleta."</p>

      <div className="bg-[#00a8e1]/10 p-6 rounded-2xl border-2 border-[#00a8e1]/30 mb-6 flex-grow flex flex-col overflow-y-auto">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border-l-4 border-[#00a8e1]">
          <p className="text-slate-700 leading-relaxed italic">"{currentCase.description}"</p>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{currentCase.question}</h3>
        
        <div className="space-y-3">
          {currentCase.options.map((option, idx) => {
            const isCorrect = option.startsWith(currentCase.answer);
            const isSelected = selectedOption === option;
            
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
            
            if (!showResult) {
              btnClass += "border-slate-200 hover:border-[#00a8e1] hover:bg-[#00a8e1]/5 bg-white";
            } else {
              if (isCorrect) {
                btnClass += "border-green-500 bg-green-50 text-green-800";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                btnClass += "border-slate-200 bg-white opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                className={btnClass}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {showResult && isCorrect && <CheckCircle2 className="text-green-500" size={20} />}
                    {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                    {!showResult && <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                  </div>
                  <span className="leading-relaxed">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            className="flex items-center gap-2 px-6 py-3 bg-[#00a8e1] text-white font-bold rounded-xl hover:bg-[#007b99] transition-colors"
          >
            Siguiente Caso <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
