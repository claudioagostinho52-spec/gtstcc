/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion'; // Corrigido para framer-motion padrão
import { 
  ArrowRight, Bot,  Zap, Shield, Globe, 
  Building2, Building, Activity, Cpu, CircuitBoard 
  Layers, MessageSquare, Microscope 
} from 'lucide-react';
import { AppView } from '../types';

interface HomeProps {
  setView: (view: AppView) => void;
}

export function Home({ setView }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg selection:bg-brand-accent/30">
      
      {/* HERO SECTION - APRESENTAÇÃO DE IMPACTO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Background Dinâmico */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        <div className="container mx-auto max-w-[1200px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900/50 border border-white/10 mb-12 backdrop-blur-xl shadow-2xl">
              <span className="status-dot text-brand-accent" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">IMPS • TCC 2026 • SMARTBITS</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-8">
              Luva Inteligente <br />
              <span className="unitel-accent italic drop-shadow-[0_0_30px_rgba(249,115,22,0.2)]">LGA CORE</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 mb-16 max-w-3xl leading-relaxed font-light">
              Transformando movimentos biomecânicos em voz. Uma solução assistiva de alta fidelidade para o <span className="text-white font-bold border-b border-brand-accent/50">Centro Unitel-Coqueiros</span>.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-center">
              <button 
                onClick={() => setView('translator')}
                className="group relative w-full md:w-auto bg-brand-accent text-white px-12 py-6 rounded-2xl font-black flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(249,115,22,0.5)] text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                ATIVAR TERMINAL LGA <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex items-center gap-8 py-4 px-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <div className="flex flex-col items-start border-r border-white/10 pr-8">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Engenharia</span>
                    <span className="text-sm font-bold text-brand-primary">V2.4 STABLE</span>
                 </div>
                 <div className="flex flex-col items-start">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Localidade</span>
                    <span className="text-sm font-bold text-white">COQUEIROS</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID DE ESPECIFICAÇÕES TÉCNICAS */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card Principal de Implementação */}
            <div className="lg:col-span-7 bento-card p-12 flex flex-col justify-between min-h-[500px]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center mb-8 border border-brand-primary/30">
                  <Building2 className="text-brand-primary w-8 h-8" />
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Implementação de <br /> Impacto Social</h3>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                  Desenhado especificamente para o balcão de atendimento Unitel, permitindo fluidez na comunicação entre consultores e clientes com deficiência auditiva.
                </p>
              </div>
              <div className="flex gap-4 mt-12">
                <span className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-bold border border-white/10 uppercase">Hardware Integrado</span>
                <span className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-bold border border-white/10 uppercase">Rede Neural LGA</span>
              </div>
            </div>

            {/* Card de Telemetria Dinâmica */}
            <div className="lg:col-span-5 bento-card p-10 bg-slate-900/40 border-brand-primary/20">
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Sinal em Tempo Real</span>
                  <span className="text-2xl font-bold text-white">Telemetria IMPS</span>
                </div>
                <Activity className="text-brand-primary animate-pulse" size={24} />
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Latência de Resposta", val: "24ms", color: "bg-brand-cyan" },
                  { label: "Precisão de Gesto", val: "98.2%", color: "bg-brand-primary" },
                  { label: "Taxa de Amostragem", val: "100Hz", color: "bg-brand-accent" }
                ].map((stat, i) => (
                  <div key={i} className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</span>
                      <span className="text-[10px] font-mono text-white">{stat.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards Menores de Pilares */}
            {[
              { icon: Shield, title: "IMPS Secure", desc: "Criptografia de ponta a ponta nos dados de sensores." },
              { icon: Zap, title: "LGA Core", desc: "Motor de tradução otimizado para dialetos locais." },
              { icon: Globe, title: "Escalável", desc: "Pronto para expansão em toda rede Unitel Angola." }
            ].map((pilar, i) => (
              <div key={i} className="lg:col-span-4 bento-card p-8 group hover:bg-white/5">
                <pilar.icon className="text-brand-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="text-xl font-bold mb-3">{pilar.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO ACADÉMICA / TCC */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Microscope className="w-12 h-12 text-brand-primary mx-auto mb-8 opacity-20" />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter">
            Trabalho de Conclusão <br /> de Curso
          </h2>
          <p className="text-xl text-slate-400 mb-16 font-light leading-relaxed">
            Este protótipo representa a convergência entre eletrônica avançada e inteligência artificial, validado tecnicamente pelo <span className="text-white">Smartbits Institute</span> como solução viável para acessibilidade urbana.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase mb-2">Desenvolvimento</span>
              <span className="text-lg font-bold text-white">EQUIPE SMARTBITS</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/10 px-8">
              <span className="text-[10px] font-black text-slate-500 uppercase mb-2">Ciclo Académico</span>
              <span className="text-lg font-bold text-white">2026 / 2027</span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <span className="text-[10px] font-black text-slate-500 uppercase mb-2">Orientação</span>
              <span className="text-lg font-bold text-white">IMPS BOARD</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PROFISSIONAL */}
      <footer className="py-20 bg-slate-950/50 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-8">
               // Exemplo no Footer ou Header
<div className="p-2 bg-brand-accent rounded-lg">
  <Cpu size={24} className="text-white" />
</div>
                <span className="text-2xl font-display font-bold tracking-tighter text-white uppercase">SmartGlove</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Um projeto Smartbits dedicado à inclusão social e excelência técnica em engenharia de sistemas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-20">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">SISTEMA</span>
                <button onClick={() => setView('translator')} className="text-slate-400 hover:text-brand-accent transition-colors text-left text-sm font-bold uppercase tracking-tighter">Terminal de Tradução</button>
                <button className="text-slate-400 hover:text-brand-accent transition-colors text-left text-sm font-bold uppercase tracking-tighter opacity-30 cursor-not-allowed">Logs do Sistema</button>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">PARCEIROS</span>
                <span className="text-slate-500 text-sm font-bold">UNITEL ANGOLA</span>
                <span className="text-slate-500 text-sm font-bold">SMARTBITS IMPS</span>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">
            <span>IMPS © 2026 TODOS OS DIREITOS RESERVADOS</span>
            <div className="flex gap-4">
              <span>ENG_UNITEL_LGA_V2</span>
              <div className="status-dot text-emerald-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}