/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, Target, Power, Hash, UserCircle, Clock, Info, Shield, Radio, ChevronRight, Bot, Activity } from 'lucide-react';
import { Hand3D } from './Hand3D';
import { gestureService } from '../services/gestureModel';
import { useWebSocket } from '../hooks/useWebSocket';

interface TranslatorProps {
  ws: ReturnType<typeof useWebSocket>;
}

export function Translator({ ws }: TranslatorProps) {
  const [ip, setIp] = useState('192.168.1.100');
  const { data, status, connect, disconnect } = ws;
  const [translation, setTranslation] = useState('Aguardando Gesto...');
  const [isAutoSpeech, setIsAutoSpeech] = useState(true);
  const [lastSpoken, setLastSpoken] = useState('');
  const [sessionTime, setSessionTime] = useState(0);

  const isConnected = status === 'connected';

  useEffect(() => {
    let interval: any;
    if (isConnected) {
      interval = setInterval(() => setSessionTime(prev => prev + 1), 1000);
    } else {
      setSessionTime(0);
    }
    return () => clearInterval(interval);
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
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
    setLastSpoken(text);
  }, [lastSpoken]);

  useEffect(() => {
    if (data && status === 'connected') {
      const runPrediction = async () => {
        const result = await gestureService.predict(data);
        if (result !== translation) {
          setTranslation(result);
          if (isAutoSpeech) speak(result);
        }
      };
      runPrediction();
    }
  }, [data, status, translation, isAutoSpeech, speak]);

  const handleConnect = () => {
    if (status === 'connected') {
      disconnect();
    } else {
      connect(ip);
    }
  };


  return (
    <div className="container mx-auto px-4 md:px-6 py-6 pb-24 max-w-[1500px]">
      {/* Dashboard Sub-Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-10 gap-6">
        <div className="w-full lg:w-auto">
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] md:text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] px-2 md:px-3 py-1 bg-brand-primary/10 rounded-md border border-brand-primary/20">Monitoramento Ativo</span>
              <div className="h-px w-6 md:w-10 bg-white/10" />
              <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Terminal Coqueiros #01</span>
           </div>
           <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white leading-tight">Central de Atendimento <br className="sm:hidden" /> <span className="unitel-accent">Inclusivo Unitel</span></h2>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
           <div className="bento-card w-full lg:w-auto px-4 md:px-6 py-3 border-white/5 flex items-center justify-between lg:justify-start gap-4 md:gap-6 bg-slate-900/40">
              <div className="flex flex-col">
                 <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5 md:gap-2"><Clock className="w-3 h-3" /> Tempo</span>
                 <span className="text-base md:text-lg font-mono font-bold text-white">{formatTime(sessionTime)}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                 <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5 md:gap-2"><UserCircle className="w-3 h-3" /> Consultor</span>
                 <span className="text-xs md:text-sm font-bold text-slate-300">#0923-COQ</span>
              </div>
           </div>
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-6 gap-4 md:gap-6 h-auto lg:h-[calc(100vh-250px)] lg:min-h-[750px] relative">
        {/* Main Observation Deck (3D Hand) */}
        <div className="lg:col-span-8 lg:row-span-4 bento-card border-white/5 bg-slate-950/40 group overflow-hidden min-h-[400px] lg:min-h-0">
          <div className="absolute top-0 left-0 right-0 h-12 md:h-14 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-slate-900/20 z-10 backdrop-blur-md">
             <div className="flex items-center gap-3 md:gap-4">
                <div className={`status-dot ${isConnected ? 'text-brand-primary' : 'text-slate-600'}`} />
                <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Sensorial 3D • LGA Core</span>
             </div>
             <div className="flex items-center gap-4 hidden xs:flex">
                <div className="text-[8px] md:text-[9px] font-bold text-slate-500 tracking-widest bg-slate-900 px-2 py-1 rounded">WEBGL 2.0</div>
             </div>
          </div>
          
          <div className="w-full h-full pt-12 md:pt-14 pb-12 md:pb-14 relative grid-bg opacity-30 flex items-center justify-center overflow-hidden">
            <div className="scale-75 md:scale-100 transition-transform">
              <Hand3D data={data} />
            </div>
          </div>
          
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-auto flex items-center gap-2 md:gap-3 z-10">
             <div className="bento-card bg-black/60 px-3 md:px-5 py-2 md:py-2.5 border-white/10 flex items-center gap-3 md:gap-4 grow lg:grow-0 justify-center">
                <div className="flex flex-col">
                   <span className="text-[7px] md:text-[8px] font-bold text-brand-primary uppercase">Giro X</span>
                   <span className="text-[10px] md:text-[11px] font-mono text-white">{(data?.imu.gyro.x || 0).toFixed(1)}</span>
                </div>
                <div className="w-px h-5 md:h-6 bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-[7px] md:text-[8px] font-bold text-brand-primary uppercase">Accel Z</span>
                   <span className="text-[10px] md:text-[11px] font-mono text-white">{(data?.imu.accel.z || 0).toFixed(1)}</span>
                </div>
             </div>
             <div className="bento-card bg-brand-primary/10 px-3 md:px-4 py-2 text-[9px] md:text-[10px] font-bold text-brand-primary uppercase tracking-widest border-brand-primary/30 hidden sm:block">
               IMU OK
             </div>
          </div>
        </div>

        {/* Translation AI Unit */}
        <div className="lg:col-span-4 lg:row-span-3 bento-card border-brand-primary/20 bg-brand-primary/5 flex flex-col items-center justify-center p-8 md:p-12 text-center relative group min-h-[300px] lg:min-h-0">
          <div className="absolute top-4 md:top-6 left-4 md:left-6">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" />
             </div>
          </div>
          <div className="absolute top-4 md:top-6 right-4 md:right-6">
             <div className="bg-slate-950/80 px-2 md:px-3 py-1 rounded-full border border-white/10 text-[8px] md:text-[9px] font-mono font-bold text-slate-500">
               LGA_V2
             </div>
          </div>
          
          <motion.div
            key={translation}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            <span className="text-[9px] md:text-[10px] font-bold text-brand-primary uppercase tracking-[0.5em] mb-6 md:mb-8">SaídaInterpretada</span>
            <div className="relative group w-full px-4">
               <div className="absolute -inset-4 bg-brand-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tighter text-white mb-2 relative break-words leading-tight">
                 {translation}
               </h3>
            </div>
            
            <div className="mt-8 md:mt-12 flex gap-4">
               <button 
                onClick={() => speak(translation)}
                title="Sincronizar Voz"
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-[20px] bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95 group/btn"
               >
                 <Volume2 className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:scale-110 transition-transform" />
               </button>
            </div>
          </motion.div>
          
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 px-8 md:px-12">
             <div className="flex items-center justify-between text-[9px] md:text-[10px] font-bold mb-2 md:mb-3 uppercase tracking-widest text-slate-500">
                <span>Precisão</span>
                <span className="text-brand-primary">{isConnected ? '96.8%' : '0%'}</span>
             </div>
             <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isConnected ? '96.8%' : '0%' }}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-cyan shadow-[0_0_12px_rgba(59,130,246,0.4)]" 
                />
             </div>
          </div>
        </div>

        {/* Administration & Protocol */}
        <div className="lg:col-span-4 lg:row-span-3 bento-card p-6 md:p-10 flex flex-col justify-between min-h-[450px] lg:min-h-0">
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
               <Shield className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" />
               <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] text-white">Terminal Unitel</h4>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">IP Gateway (UDP)</label>
                <div className="relative group/input">
                  <Radio className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-slate-600 transition-colors group-focus-within/input:text-brand-primary" />
                  <input 
                    type="text" 
                    value={ip} 
                    onChange={(e) => setIp(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-6 text-xs md:text-sm font-mono text-slate-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <button 
                  onClick={handleConnect}
                  disabled={status === 'connecting'}
                  className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 md:gap-3 transition-all text-[11px] md:text-sm tracking-widest uppercase ${
                    isConnected 
                      ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' 
                      : 'bg-brand-primary text-white shadow-xl md:shadow-2xl shadow-brand-primary/30 hover:-translate-y-1'
                  }`}
                >
                  <Power className="w-4 h-4 md:w-5 md:h-5" />
                  {isConnected ? 'Encerrar' : 'Ativar Interface'}
                </button>
              </div>

              <div className="pt-6 md:pt-8 border-t border-white/5">
                 <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[10px] md:text-[11px] font-bold text-slate-300">Voz Adaptativa</span>
                       <span className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-tighter">Motor de Síntese Web</span>
                    </div>
                    <button 
                      onClick={() => setIsAutoSpeech(!isAutoSpeech)}
                      className={`w-12 h-6 md:w-14 md:h-7 rounded-full transition-all relative p-1 ${isAutoSpeech ? 'bg-brand-primary' : 'bg-slate-800'}`}
                    >
                      <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-white transition-all shadow-md ${isAutoSpeech ? 'translate-x-6 md:translate-x-7' : 'translate-x-0'}`} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 bg-slate-900/50 rounded-xl md:rounded-2xl border border-white/5 mt-4 md:mt-0">
             <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-primary shrink-0" />
             <p className="text-[8px] md:text-[9px] text-slate-500 leading-tight">Mantenha a palma da mão voltada para o sensor para melhor precisão.</p>
          </div>
        </div>

        {/* Sensory Matrix - Flexors */}
        <div className="lg:col-span-8 lg:row-span-2 bento-card p-6 md:p-10 flex flex-col justify-center min-h-[300px] lg:min-h-0">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-brand-primary rounded-full" />
                 <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Matriz de Telemetria (5 Flexores)</h4>
              </div>
              <div className="text-[9px] md:text-[10px] font-mono text-slate-600 bg-black/40 px-2 md:px-3 py-1 rounded-md">REF: 1024-BIT ADU</div>
           </div>
           
           <div className="grid grid-cols-5 gap-3 md:gap-10">
              {[0, 1, 2, 3, 4].map(i => {
                const val = data?.flex?.[i] || 0;
                const percentage = Math.min(Math.max((val / 1024) * 100, 0), 100);
                return (
                  <div key={i} className="space-y-3 md:space-y-4 text-center">
                    <div className="h-16 md:h-20 bg-slate-900/40 rounded-xl md:rounded-2xl relative overflow-hidden ring-1 ring-white/5">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-primary/80 to-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-[8px] font-mono font-bold text-white/20 select-none">{Math.round(percentage)}%</span>
                      </div>
                    </div>
                    <div className="group-hover:scale-105 transition-transform">
                      <p className="text-[6px] md:text-[8px] font-bold text-slate-500 uppercase tracking-tighter truncate">{['Polegar', 'Indic.', 'Médio', 'Anel.', 'Mín.'][i]}</p>
                      <p className="text-[9px] md:text-[11px] font-mono font-bold text-brand-primary mt-0.5">{val}</p>
                    </div>
                  </div>
                );
              })}
           </div>
        </div>
      </main>

      {/* Persistence Bar Features */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
         {[
           { icon: Shield, label: 'Segurança', val: 'End-to-End', detail: 'Protocolo Smartbits' },
           { icon: Activity, label: 'Frequência', val: '2.4GHz WiFi', detail: 'Sinal: -42dBm' },
           { icon: UserCircle, label: 'Usuário', val: 'Identificado', detail: 'Atendimento: #Coq-Aux' },
           { icon: Radio, label: 'Gateway', val: 'Unitel-Coq', detail: 'Servidor: Local' }
         ].map((stat, i) => (
           <div key={i} className="bento-card p-6 bg-slate-900/40 border-white/5 flex items-center gap-5 hover:bg-slate-900/60 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center shrink-0">
                 <stat.icon className="text-brand-primary w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{stat.label}</p>
                 <p className="text-sm font-bold text-white truncate">{stat.val}</p>
                 <p className="text-[10px] text-slate-500 italic mt-0.5">{stat.detail}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

