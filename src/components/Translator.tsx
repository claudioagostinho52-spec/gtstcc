/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion'; // Corrigido de 'motion/react' para 'framer-motion'
import { Volume2, Power, Radio, Clock, UserCircle, Shield, Bot, Info, Activity } from 'lucide-react';
import { Hand3D } from './Hand3D';
import { gestureService } from '../services/gestureModel';
import { useWebSocket } from '../hooks/useWebSocket';

interface TranslatorProps {
  ws: ReturnType<typeof useWebSocket>;
}

export function Translator({ ws }: TranslatorProps) {
  // Alterado para o IP padrão do modo Access Point que criamos no ESP32
  const [ip, setIp] = useState('192.168.4.1'); 
  const { data, status, connect, disconnect } = ws;
  const [translation, setTranslation] = useState('Aguardando Gesto...');
  const [isAutoSpeech, setIsAutoSpeech] = useState(true);
  const [lastSpoken, setLastSpoken] = useState('');
  const [sessionTime, setSessionTime] = useState(0);

  const isConnected = status === 'connected';

  // Timer da sessão
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

  const speak = useCallback((text: string) => {
    if (!text || text === lastSpoken || text.includes('Aguardando')) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT'; // Ajustado para português
    window.speechSynthesis.speak(utterance);
    setLastSpoken(text);
  }, [lastSpoken]);

  // Lógica de Tradução e Voz
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

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect(ip);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-[1500px] text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-400/10 rounded-md border border-blue-400/20">Monitoramento Ativo</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Terminal Coqueiros #01</span>
           </div>
           <h2 className="text-3xl font-bold tracking-tight">Central de Atendimento <span className="text-blue-500">Inclusivo Unitel</span></h2>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
           <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-2"><Clock size={12} /> Tempo</span>
              <span className="text-lg font-mono font-bold">{formatTime(sessionTime)}</span>
           </div>
           <div className="w-px h-8 bg-white/10" />
           <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-2"><UserCircle size={12} /> Consultor</span>
              <span className="text-sm font-bold text-slate-300">#0923-COQ</span>
           </div>
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Lado Esquerdo: Mão 3D */}
        <div className="lg:col-span-8 bg-slate-900/20 rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 bg-slate-900/40 backdrop-blur-md flex justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sensorial 3D • LGA Core</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">WEBGL 2.0</span>
          </div>

          <Hand3D data={data} />

          {/* Dados IMU (MPU6050) */}
          <div className="absolute bottom-6 left-6 flex gap-3">
             <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex gap-4">
                <div className="flex flex-col">
                   <span className="text-[8px] font-bold text-blue-400 uppercase">Accel X</span>
                   <span className="text-xs font-mono">{data?.imu?.accel?.x?.toFixed(1) || '0.0'}</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-bold text-blue-400 uppercase">Accel Y</span>
                   <span className="text-xs font-mono">{data?.imu?.accel?.y?.toFixed(1) || '0.0'}</span>
                </div>
             </div>
             <div className="bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/30 text-[10px] font-bold text-blue-500 flex items-center">
               IMU {isConnected ? 'OK' : '--'}
             </div>
          </div>
        </div>

        {/* Lado Direito: Tradução e Controles */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card de Tradução */}
          <div className="flex-1 bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative">
            <Bot className="absolute top-6 left-6 text-blue-500" size={24} />
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em] mb-4">Saída Interpretada</span>
            <h3 className="text-5xl font-bold mb-8">{translation}</h3>
            <button 
              onClick={() => speak(translation)}
              className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-blue-500 transition-all active:scale-95"
            >
              <Volume2 size={24} />
            </button>
          </div>

          {/* Configurações */}
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={18} className="text-blue-500" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Configurações</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">IP do ESP32 (Modo AP)</label>
                <div className="relative">
                  <Radio className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 text-sm font-mono focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleConnect}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
                  isConnected ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-blue-500 text-white'
                }`}
              >
                <Power size={18} />
                {isConnected ? 'Desconectar' : 'Ativar Interface'}
              </button>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-bold">Voz Automática</span>
                <button 
                  onClick={() => setIsAutoSpeech(!isAutoSpeech)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isAutoSpeech ? 'bg-blue-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAutoSpeech ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Grid de Flexores */}
      <div className="mt-6 bg-slate-900/20 border border-white/5 rounded-3xl p-8">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Activity size={14} className="text-blue-500" /> Matriz de Telemetria (5 Flexores)
        </h4>
        <div className="grid grid-cols-5 gap-6">
          {['Polegar', 'Indic.', 'Médio', 'Anel.', 'Mín.'].map((dedo, i) => {
            const val = data?.flex?.[i] || 0;
            const percentage = (val / 1024) * 100;
            return (
              <div key={i} className="text-center">
                <div className="h-24 bg-slate-900 rounded-xl relative overflow-hidden border border-white/5">
                  <motion.div 
                    animate={{ height: `${percentage}%` }}
                    className="absolute bottom-0 w-full bg-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-3">{dedo}</p>
                <p className="text-xs font-mono font-bold text-blue-400">{val}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}