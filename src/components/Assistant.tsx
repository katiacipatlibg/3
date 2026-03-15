import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Brain, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Assistant() {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: '¡Jinkies! Soy Velma. Estoy aquí para ayudarte a resolver cualquier misterio sobre Vygotsky, las herramientas de la mente y la Zona de Desarrollo Próximo. ¿Qué pista necesitas analizar?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const prompt = `Historial de conversación:\n${messages.map(m => `${m.role}: ${m.text}`).join('\n')}\nuser: ${userMsg}\nassistant:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: 'Eres Velma Dinkley de Scooby-Doo. Eres una experta en psicología educativa, específicamente en la teoría de Lev Vygotsky (Herramientas de la mente, Zona de Desarrollo Próximo, Funciones Mentales Superiores e Inferiores, Andamiaje). Responde a las preguntas del estudiante de manera inteligente, analítica y usando frases típicas de Velma como "¡Jinkies!" o "Mis gafas...". Mantén tus respuestas claras, educativas y enfocadas en el tema de Vygotsky. Usa formato markdown para resaltar conceptos importantes.'
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', text: response.text || 'No pude encontrar una pista para eso...' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: '¡Zoinks! Parece que hubo un problema técnico. Intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-slate-100">
        <div className="bg-[#f7931e] p-2 rounded-xl text-white">
          <Brain size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#f7931e] flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="Glasses">👓</span> Velma AI
          </h2>
          <p className="text-sm text-slate-500">Asistente de Estudio Vygotskiano</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${msg.role === 'user' ? 'bg-[#7b5294]' : 'bg-[#f7931e]'}`}>
                {msg.role === 'user' ? <User size={16} /> : <span className="font-bold font-serif">V</span>}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[#7b5294] text-white rounded-tr-none' : 'bg-orange-50 text-slate-800 rounded-tl-none border border-orange-100'}`}>
                <div className="markdown-body text-sm sm:text-base prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f7931e] flex items-center justify-center text-white">
                <span className="font-bold font-serif">V</span>
              </div>
              <div className="p-4 rounded-2xl bg-orange-50 text-slate-800 rounded-tl-none border border-orange-100 flex items-center gap-2">
                <Loader2 className="animate-spin text-[#f7931e]" size={20} />
                <span className="text-sm text-slate-500">Buscando pistas...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregúntale a Velma sobre la ZDP..."
          className="flex-grow p-4 rounded-xl border-2 border-slate-200 focus:border-[#f7931e] focus:outline-none transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-4 bg-[#f7931e] text-white rounded-xl hover:bg-[#d67a11] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Send size={24} />
        </button>
      </form>
    </div>
  );
}
