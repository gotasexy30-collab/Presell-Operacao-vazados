import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight, XCircle, Settings, X } from "lucide-react";

export const Route = createFileRoute("/")({
  component: QuizIndex,
});

const QUESTIONS = [
  {
    id: 1,
    question: "Você é maior de 18 anos?",
    yesText: "Sim, sou maior",
    noText: "Não",
  },
];

function QuizIndex() {
  const [step, setStep] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState("https://google.com");
  const [showAdmin, setShowAdmin] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem("redirectUrl");
    if (savedUrl) {
      setRedirectUrl(savedUrl);
    }
  }, []);

  const handleAnswer = (isYes: boolean) => {
    setStep((prev) => prev + 1);
  };

  const openAdmin = () => {
    setTempUrl(redirectUrl);
    setShowAdmin(true);
  };

  const handleSaveAdmin = () => {
    if (tempUrl.trim()) {
      localStorage.setItem("redirectUrl", tempUrl.trim());
      setRedirectUrl(tempUrl.trim());
    }
    setShowAdmin(false);
  };

  const renderContent = () => {
    if (step >= QUESTIONS.length) {
      return (
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500 text-center">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">
            Perfil Aprovado!
          </h1>
          <button
            className="w-full relative group overflow-hidden rounded-xl bg-pink-600 px-8 py-4 font-bold text-white transition-all hover:bg-pink-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(219,39,119,0.5)]"
            onClick={() => window.location.href = redirectUrl}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              Acessar agora <ArrowRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
          <p className="text-xs text-zinc-500 mt-4">
            Acesso 100% seguro e sigiloso.
          </p>
        </div>
      );
    }

    const currentQ = QUESTIONS[step];
    const progress = ((step) / QUESTIONS.length) * 100;

    return (
      <>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900">
          <div
            className="h-full bg-pink-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-3">
              {currentQ.question}
            </h2>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(true)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-pink-500/50 text-white font-bold text-xl py-5 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-between group"
            >
              <span>{currentQ.yesText}</span>
              <CheckCircle2 className="w-6 h-6 text-zinc-600 group-hover:text-pink-500 transition-colors" />
            </button>
            
            <button
              onClick={() => handleAnswer(false)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white font-bold text-xl py-5 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-between group"
            >
              <span>{currentQ.noText}</span>
              <XCircle className="w-6 h-6 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative">
      {renderContent()}

      {/* Admin Panel Button */}
      <button
        onClick={openAdmin}
        className="fixed bottom-4 right-4 p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors z-40 shadow-lg"
        title="Configurar Redirecionamento"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Admin Modal */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-sm relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAdmin(false)} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Configuração</h3>
            <label className="block text-sm text-zinc-400 mb-2">Link de Redirecionamento</label>
            <input
              type="url"
              value={tempUrl}
              onChange={e => setTempUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-3 mb-6 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              placeholder="https://exemplo.com"
            />
            <button 
              onClick={handleSaveAdmin} 
              className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-500 transition-colors"
            >
              Salvar Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}