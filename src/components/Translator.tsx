/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, Power, Radio, Clock, UserCircle, Shield, 
  Bot, Info, Activity, Cpu, Zap, Wifi, WifiOff, Settings2, Languages 
} from 'lucide-react';
import { Hand3D } from './Hand3D';
import { gestureService } from '../services/gestureModel';
import { useWebSocket } from '../hooks/useWebSocket';

interface TranslatorProps {
  ws: ReturnType<typeof useWebSocket>;
}

export function Translator({ ws }: TranslatorProps) {
  // Estados Originais Mantidos
  const [ip, setIp] = useState('192.168.4.1'); 
  const { data, status, connect, disconnect } = ws;
  const [translation, setTranslation] = useState('Aguardando Gesto...');
  const [isAutoSpeech, setIsAutoSpeech] = useState(true);
  const [lastSpoken, setLastSpoken] = useState('');
  const [sessionTime, setSessionTime] = useState(0);

  const isConnected = status === 'connected';

  // Lógica Original: Timer da sessão
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => setSessionTime(prev => prev + 1), 1000);
    } else {
      setSessionTime(0);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Lógica Original: Sintetizador de Voz
  const speak = useCallback((text: string) => {
    if (!text || text === lastSpoken || text.includes('Aguardando')) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    window.speechSynthesis.speak(utterance);
    setLastSpoken(text);
  }, [lastSpoken]);

  // Lógica Original: Predição de Gesto
  useEffect(() => {
    if (data && isConnected) {
      const runPrediction = async () => {
        try {
          const result = await gestureService.predict(data);
          if (result && result !== translation) {
            setTranslation(result);
            if (isAutoSpeech) speak(result);
          }
        } catch (error) {
          console.error("Erro na predição:", error);
        }
      };
      runPrediction();
    }
  }, [data, isConnected, translation, isAutoSpeech, speak]);

  // Lógica de Conexão
  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect(ip);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 font-sans p-4 lg:p-8 selection:bg-blue-500/30">
      {/* Elementos Visuais de Fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* HEADER DASHBOARD */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-slate-900/20 border border-white/5 p-6 rounded-[2rem] backdrop-blur-2xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <Cpu size={32} className="text-white" />
              </div>
              {isConnected && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#020408] rounded-full animate-pulse" />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] px-2 py-0.5 bg-blue-400/10 rounded-md border border-blue-400/20">Monitoramento Ativo</span>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Terminal Coqueiros #01</span>
              </div>
              <h2 className="text-3xl font-black tracking-tighter text-white">Interface de Atendimento <span className="text-blue-500">Inclusivo Unitel</span></h2>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-black/40 p-2 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4 px-4 py-2">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2"><Clock size={12} /> Tempo de Sessão</span>
                <span className="text-xl font-mono font-bold text-blue-100">{formatTime(sessionTime)}</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col px-4">
              <span className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2"><UserCircle size={12} /> Consultor</span>
              <span className="text-sm font-bold text-slate-300">#0923-COQ</span>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PAINEL CENTRAL: VISUALIZAÇÃO 3D */}
          <section className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/10 border border-white/10 rounded-[3rem] relative h-[500px] lg:h-[650px] overflow-hidden flex items-center justify-center group shadow-inner backdrop-blur-sm">
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-4 py-2 bg-black/60 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Sensorial 3D • LGA Core</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-mono pl-1 tracking-widest">SISTEMA WEBGL 2.0 ATIVO</span>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md">
                   <Info size={18} className="text-slate-500" />
                </div>
              </div>

              <Hand3D data={data} />

              {/* TELEMETRIA IMU HUD */}
              <div className="absolute bottom-8 left-8 flex gap-4">
                <div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] flex gap-8 items-center shadow-2xl">
                  {['x', 'y', 'z'].map((axis) => (
                    <div key={axis} className="flex flex-col">
                      <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Accel {axis}</span>
                      <span className="text-lg font-mono font-bold text-white leading-tight">
                        {(data?.imu?.accel as any)?.[axis]?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  ))}
                  <div className="h-10 w-px bg-white/10" />
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-colors ${isConnected ? 'bg-blue-500/10 border-blue-500/40 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                    IMU {isConnected ? 'SYNC' : 'WAIT'}
                  </div>
                </div>
              </div>
            </div>

            {/* BARRA DE TELEMETRIA DOS DEDOS */}
            <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-md">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-3">
                  <Activity size={16} className="text-blue-500" /> Matriz de Sensores de Flexão
                </h4>
                <div className="h-px flex-1 mx-8 bg-gradient-to-r from-blue-500/20 to-transparent" />
              </div>
              
              <div className="grid grid-cols-5 gap-10">
                {['Polegar', 'Indicador', 'Médio', 'Anelar', 'Mínimo'].map((name, i) => {
                  const val = data?.flex?.[i] || 0;
                  const percentage = (val / 90) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center group">
                      <div className="w-full h-32 bg-black/40 rounded-3xl relative overflow-hidden border border-white/5 p-1">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${percentage}%` }}
                          transition={{ type: 'spring', stiffness: 100 }}
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 via-blue-400 to-indigo-400 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-mono font-black text-white mix-blend-difference">{val}°</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase mt-4 tracking-tighter group-hover:text-blue-400 transition-colors">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PAINEL LATERAL: TRADUÇÃO E CONTROLES */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* DISPLAY DE TRADUÇÃO "NEON" */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(37,99,235,0.2)] flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <Bot className="absolute top-8 left-8 text-white/30" size={32} />
              
              <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.5em] mb-8 relative">Saída Neural</span>
              
              <AnimatePresence mode="wait">
                <motion.h3 
                  key={translation}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-6xl font-black text-white mb-12 tracking-tighter drop-shadow-2xl relative"
                >
                  {translation}
                </motion.h3>
              </AnimatePresence>

              <button 
                onClick={() => speak(translation)}
                className="group relative flex items-center justify-center w-20 h-20 bg-black/20 hover:bg-black/40 rounded-3xl border border-white/20 transition-all active:scale-90"
              >
                <Volume2 className="text-white group-hover:scale-110 transition-transform" size={28} />
              </button>
            </div>

            {/* PAINEL DE CONFIGURAÇÕES AVANÇADAS */}
            <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Settings2 size={20} className="text-blue-500" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Parâmetros do Link</h4>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase px-1 tracking-widest">Endereço IP (Gateway)</label>
                  <div className="relative group">
                    <Radio className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 group-focus-within:animate-pulse" size={18} />
                    <input 
                      type="text" 
                      value={ip}
                      onChange={(e) => setIp(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl py-5 pl-14 text-sm font-mono focus:border-blue-500 outline-none transition-all placeholder:opacity-20"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleConnect}
                  className={`w-full py-6 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 transition-all shadow-xl ${
                    isConnected 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 shadow-red-500/5' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20 active:translate-y-1'
                  }`}
                >
                  {isConnected ? <WifiOff size={20} /> : <Wifi size={20} />}
                  {isConnected ? 'Interromper' : 'Sincronizar'}
                </button>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Languages size={18} className="text-slate-500" />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">Voz Automática</span>
                   </div>
                   <button 
                    onClick={() => setIsAutoSpeech(!isAutoSpeech)}
                    className={`w-14 h-7 rounded-full p-1 transition-colors ${isAutoSpeech ? 'bg-blue-600' : 'bg-slate-700'}`}
                  >
                    <motion.div 
                      animate={{ x: isAutoSpeech ? 28 : 0 }}
                      className="w-5 h-5 bg-white rounded-full shadow-lg"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER SECURITY INFO */}
            <div className="px-8 py-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/10 flex items-center gap-5">
              <Shield size={24} className="text-blue-500/60" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo Seguro</span>
                <span className="text-[9px] text-slate-600 font-mono">ENCRYPTED WEBSOCKET PORT 81</span>
              </div>
            </div>

          </aside>
        </main>
      </div>
    </div>
  );
}