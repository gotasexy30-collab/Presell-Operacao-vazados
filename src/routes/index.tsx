import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ArrowRight, XCircle } from "lucide-react";

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

  const handleAnswer = (isYes: boolean) => {
    setStep((prev) => prev + 1);
  };

  if (step >= QUESTIONS.length) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">
            Perfil Aprovado!
          </h1>
          <button
            className="w-full relative group overflow-hidden rounded-xl bg-pink-600 px-8 py-4 font-bold text-white transition-all hover:bg-pink-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(219,39,119,0.5)]"
            onClick={() => window.location.href = "https://google.com"} // Substituir pelo link de afiliado
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
      </div>
    );
  }

  const currentQ = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
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
    </div>
  );
}