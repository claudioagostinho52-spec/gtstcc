/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Cpu, Hand, Zap, Shield, Globe, Building2, Building, Activity } from 'lucide-react';
import { AppView } from '../types';

interface HomeProps {
  setView: (view: AppView) => void;
}

export function Home({ setView }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Official Project Presentation */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden min-h-[95vh] flex items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid-bg opacity-30" />
        </div>

        <div className="container mx-auto max-w-[1000px] relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900 border border-white/10 mb-10 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_#f97316] animate-pulse" />
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">IMPS • TCC 2026 • SMARTBITS</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 md:mb-10">
              Luva Inteligente <br />
              <span className="unitel-accent italic">LGA</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-slate-400 mb-8 md:mb-14 max-w-2xl leading-relaxed font-light px-4">
              Promovendo a inclusão comunicativa na <span className="text-white font-semibold italic">Unitel-Coqueiros</span> através de sistemas assistivos de tradução em tempo real.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full max-w-xs md:max-w-none">
              <button 
                onClick={() => setView('translator')}
                className="w-full md:w-auto bg-brand-accent text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-3 md:gap-4 hover:bg-brand-accent/80 transition-all hover:-translate-y-1 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.4)] text-base md:text-lg"
              >
                Ativar Terminal LGA <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <div className="flex items-center justify-center gap-6 md:gap-8 py-2 md:pl-8 md:border-l border-white/10 w-full md:w-auto">
                 <div className="flex flex-col items-center md:items-start px-2 text-center md:text-left">
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-xs md:text-sm font-bold text-brand-primary uppercase">Core 2.0</span>
                 </div>
                 <div className="flex flex-col items-center md:items-start px-2 text-center md:text-left">
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Unidade</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase">Coqueiros</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contextual Sections */}
      <section className="py-32 bg-slate-950/50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
             <div className="lg:w-1/2">
                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.4em] mb-6">Implementação Local</h2>
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-10 leading-tight">Solução de Acessibilidade no Centro Coqueiros</h3>
                
                <div className="space-y-8">
                   {[
                     { icon: Building2, title: 'Atendimento Inclusivo', text: 'Permite que consultores Unitel sem conhecimento de LGA entendam solicitações de clientes surdos em tempo real.' },
                     { icon: Shield, title: 'Conformidade Técnica', text: 'Protocolos de segurança IMPS integrados para proteção de dados sensíveis do usuário.' },
                     { icon: Globe, title: 'Escalabilidade Nacional', text: 'Desenvolvido para ser replicado em qualquer centro de atendimento Unitel em Angola.' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all">
                           <item.icon className="w-6 h-6 text-brand-primary group-hover:text-white" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors">{item.title}</h4>
                           <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="lg:w-1/2 grid grid-cols-2 gap-5">
                <div className="bento-card p-10 flex flex-col justify-between aspect-square bg-brand-primary/5">
                   <div className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Capacidade IMPS</div>
                   <h4 className="text-3xl font-display font-bold mt-4 leading-tight">Protótipo <br /> de Alta <br /> Fidelidade</h4>
                   <p className="text-xs text-slate-500 mt-4 italic">Certificado pelo Instituto Médio Politécnico Smartbits.</p>
                </div>
                <div className="space-y-5">
                   <div className="bento-card p-8 bg-brand-accent/5">
                      <p className="text-xs text-brand-accent font-bold mb-2 uppercase">UNITEL</p>
                      <h4 className="text-xl font-bold">Foco no Cliente</h4>
                      <p className="text-xs text-slate-500 mt-2">Impacto direto no tempo médio de atendimento.</p>
                   </div>
                   <div className="bento-card p-8 bg-slate-900 border border-brand-primary/10 flex flex-col justify-center items-center overflow-hidden h-full min-h-[300px]">
                      <Activity className="w-12 h-12 text-brand-primary mb-4 animate-pulse" />
                      <div className="w-full flex gap-1 justify-center items-end h-12">
                         {[40, 70, 45, 90, 60, 80].map((h, i) => (
                           <div 
                             key={i} 
                             className="w-2 bg-brand-primary/40 rounded-t-sm animate-height"
                             style={{ height: `${h}%` }}
                           />
                         ))}
                      </div>
                      <p className="text-[10px] text-brand-primary font-bold mt-4 uppercase tracking-widest">Sinal de Telemetria Ativo</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* TCC Vision Section */}
      <section className="py-32">
         <div className="container mx-auto px-6 max-w-5xl text-center">
            <Building className="w-12 h-12 text-brand-primary mx-auto mb-10 opacity-40" />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 tracking-tight leading-tight">
               Integrando Tecnologia Assistiva ao <br /> <span className="unitel-accent">Coração de Angola</span>
            </h2>
            <p className="text-xl text-slate-400 mb-16 leading-relaxed">
               Este TCC demonstra a viabilidade técnica e o impacto social da Inteligência Artificial aplicada ao hardware, criando pontes onde antes existiam barreiras.
            </p>
            
            <div className="flex justify-center gap-10 border-t border-white/5 pt-16">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase mb-2">Orientação</span>
                  <span className="text-lg font-bold">Equipe Smartbits</span>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase mb-2">Ano Académico</span>
                  <span className="text-lg font-bold">2026/27</span>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase mb-2">Local do Piloto</span>
                  <span className="text-lg font-bold">Coqueiros, Luanda</span>
               </div>
            </div>
         </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-24 border-t border-white/5 bg-slate-950/20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between gap-16 items-start">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-brand-accent w-8 h-8" />
                <span className="text-2xl font-display font-bold tracking-tighter text-white">SmartGlove LGA</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Projeto desenvolvido no âmbito do Trabalho de Conclusão de Curso (TCC) no Instituto Médio Politécnico Smartbits.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-20">
               <div className="flex flex-col gap-5">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Navegação</span>
                  <button onClick={() => setView('home')} className="text-slate-400 hover:text-white transition-colors text-left text-sm font-medium">Memorial Descritivo</button>
                  <button onClick={() => setView('translator')} className="text-slate-400 hover:text-white transition-colors text-left text-sm font-medium">Interface LGA</button>
                  <button onClick={() => setView('about')} className="text-slate-400 hover:text-white transition-colors text-left text-sm font-medium">Ficha Técnica</button>
               </div>
               
               <div className="flex flex-col gap-5 text-right md:text-left">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Institucional</span>
                  <span className="text-slate-400 text-sm font-medium">Smartbits IMPS</span>
                  <span className="text-slate-400 text-sm font-medium">Unitel Angola</span>
                  <span className="text-slate-400 text-sm font-medium">Coqueiros Center</span>
               </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em]">IMPS - SmartBits Institute &copy; 2026</span>
             <div className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
