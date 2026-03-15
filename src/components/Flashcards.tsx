import { useState } from 'react';
import { motion } from 'motion/react';
import { flashcards } from '../data';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const card = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#b2d235] flex items-center justify-center gap-2">
          <span className="text-3xl" role="img" aria-label="Dog">🐶</span> 
          <span className="text-3xl" role="img" aria-label="Sandwich">🥪</span> 
          Pistas de Scooby y Shaggy
        </h2>
        <p className="text-slate-500 italic mt-1">"¡Scooby-Dooby-Doo! ¡Zoinks! Hay que memorizar esto antes de que aparezca el fantasma."</p>
      </div>
      
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative preserve-3d transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#b2d235] to-[#8aab1f] rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-white border-4 border-white">
            <span className="text-6xl mb-4" role="img" aria-label="Magnifying Glass">🔍</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-center">{card.front}</h3>
            <p className="absolute bottom-4 text-sm opacity-70 flex items-center gap-1"><RotateCcw size={16}/> Toca para voltear</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#8B4513] to-[#5c2e0b] rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 sm:p-10 text-white border-4 border-white overflow-y-auto" style={{ transform: 'rotateY(180deg)' }}>
            <div className="text-left w-full space-y-4 text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: card.back }} />
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button onClick={prevCard} className="p-3 rounded-full bg-slate-100 text-[#b2d235] hover:bg-[#b2d235] hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-slate-500">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button onClick={nextCard} className="p-3 rounded-full bg-slate-100 text-[#b2d235] hover:bg-[#b2d235] hover:text-white transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
