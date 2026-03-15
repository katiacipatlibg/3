import { useState } from 'react';
import { Layers, FileQuestion, Search, Brain, Ghost } from 'lucide-react';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Cases from './components/Cases';
import Assistant from './components/Assistant';

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');
  const [showScooby, setShowScooby] = useState(false);

  return (
    <div className="min-h-screen bg-[#b2d235]/20 font-sans text-slate-800 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-[#7b5294] text-white p-4 shadow-md border-b-4 border-[#f7931e]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ghost className="w-8 h-8 text-[#b2d235]" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider">Scooby-Doo: Misterio Vygotsky</h1>
          </div>
          <div className="hidden sm:flex gap-2 items-center">
            <span className="text-2xl" role="img" aria-label="Mystery Machine">🚐</span>
            <span className="text-sm font-bold text-[#00a8e1]">Mystery Inc.</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full p-4 flex flex-col z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm">
          <TabButton active={activeTab === 'flashcards'} onClick={() => setActiveTab('flashcards')} icon={<Layers />} label="Scooby & Shaggy" color="bg-[#b2d235]" />
          <TabButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<FileQuestion />} label="Examen de Daphne" color="bg-[#7b5294]" />
          <TabButton active={activeTab === 'cases'} onClick={() => setActiveTab('cases')} icon={<Search />} label="Casos de Fred" color="bg-[#00a8e1]" />
          <TabButton active={activeTab === 'assistant'} onClick={() => setActiveTab('assistant')} icon={<Brain />} label="Velma AI" color="bg-[#f7931e]" />
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white rounded-3xl shadow-lg p-4 sm:p-6 border-2 border-[#7b5294]/20 overflow-hidden flex flex-col">
          {activeTab === 'flashcards' && <Flashcards />}
          {activeTab === 'quiz' && <Quiz />}
          {activeTab === 'cases' && <Cases />}
          {activeTab === 'assistant' && <Assistant />}
        </div>
      </main>

      {/* Footer / Watermark */}
      <footer className="text-center p-4 text-[#7b5294] font-bold opacity-70 tracking-widest z-10">
        © Miss Karu
      </footer>

      {/* Scooby Mascot Floating Button */}
      <div 
        className="fixed bottom-6 right-6 z-50 bg-[#8B4513] text-white p-3 sm:p-4 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-110 transition-transform border-4 border-[#00a8e1]"
        onClick={() => setShowScooby(!showScooby)}
      >
        <span className="text-3xl sm:text-4xl" role="img" aria-label="Scooby">🐶</span>
        {showScooby && (
          <div className="absolute bottom-full right-0 mb-4 bg-white text-slate-800 p-4 rounded-2xl shadow-xl w-48 border-2 border-[#f7931e]">
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b-2 border-r-2 border-[#f7931e] transform rotate-45"></div>
            <p className="font-bold text-center">¡Scooby-Dooby-Doo! 🐾</p>
            <p className="text-sm text-center mt-2 text-slate-600">¡Gana Scooby-Galletas resolviendo los misterios!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, color }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
        active ? `${color} text-white shadow-md transform scale-105` : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
