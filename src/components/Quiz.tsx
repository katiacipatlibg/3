import { useState } from 'react';
import { questions } from '../data';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option.startsWith(question.answer)) {
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

  if (currentIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="text-6xl" role="img" aria-label="Scooby Snacks">🦴</div>
        <h2 className="text-3xl font-bold text-[#7b5294]">¡Misterio Resuelto!</h2>
        <p className="text-xl">Scooby-Galletas ganadas: <span className="font-bold text-[#7b5294]">{score} 🦴</span> de {questions.length}</p>
        <button onClick={restart} className="px-6 py-3 bg-[#7b5294] text-white font-bold rounded-xl hover:bg-[#5a3c6d] transition-colors">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-[#7b5294] flex items-center gap-2">
          <span className="text-3xl" role="img" aria-label="Scarf">🧣</span> Examen de Daphne
        </h2>
        <span className="bg-purple-100 text-[#7b5294] px-3 py-1 rounded-full text-sm font-bold">
          Pregunta {currentIndex + 1} / {questions.length}
        </span>
      </div>
      <p className="text-slate-500 italic mb-6">"¡Jeepers! Veamos qué tanto has aprendido sobre Vygotsky. ¡Gana Scooby-Galletas por cada acierto!"</p>

      <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 mb-6 flex-grow overflow-y-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isCorrect = option.startsWith(question.answer);
            const isSelected = selectedOption === option;
            
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
            
            if (!showResult) {
              btnClass += "border-purple-200 hover:border-[#7b5294] hover:bg-white bg-white/50";
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
                    {!showResult && <div className="w-5 h-5 rounded-full border-2 border-purple-300" />}
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
            className="flex items-center gap-2 px-6 py-3 bg-[#7b5294] text-white font-bold rounded-xl hover:bg-[#5a3c6d] transition-colors"
          >
            Siguiente <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
