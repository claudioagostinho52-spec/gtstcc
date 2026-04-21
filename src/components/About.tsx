/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, GraduationCap, Github, Linkedin, Target, Shield, Building2, Smartphone, Users } from 'lucide-react';

export function About() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-6xl">
      <header className="mb-12 md:mb-20 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-8">
           Memorial Descritivo do TCC
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tighter text-white mb-6 leading-tight">
          Fundamentos do <br className="xs:hidden" /> <span className="unitel-accent">Projeto</span>
        </h1>
        <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Uma investigação sobre a convergência de sistemas embarcados e inteligência artificial para a democratização do atendimento público em Angola.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
        <section className="bento-card p-8 md:p-10 bg-gradient-to-br from-slate-900 to-slate-950">
          <BookOpen className="text-brand-accent w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8" />
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Objetivo Geral</h2>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg italic border-l-2 border-brand-accent/40 pl-4 md:pl-6">
            "Implementar um sistema de tradução assistida por hardware para facilitar o atendimento de cidadãos surdos nas agências Unitel, utilizando a LGA como base linguística."
          </p>
        </section>

        <section className="bento-card p-8 md:p-10 bg-gradient-to-br from-slate-900 to-slate-950">
          <Building2 className="text-brand-primary w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8" />
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Justificativa Social</h2>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg">
            A carência de intérpretes em tempo integral nos centros de atendimento cria barreiras de consumo e cidadania. Este projeto propõe uma ferramenta de baixo custo e alta eficiência para mitigar esse gap.
          </p>
        </section>
      </div>

      <div className="mb-20 md:mb-32">
         <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
               <Shield className="text-brand-primary w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Especificações Académicas</h2>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: GraduationCap, title: 'Instituição', val: 'IMPS Smartbits', detail: 'Instituto Médio Politécnico' },
              { icon: Target, title: 'Local de Estudo', val: 'Coqueiros', detail: 'Centro de Atendimento Unitel' },
              { icon: Smartphone, title: 'Stack Técnica', val: 'IoT & Web', detail: 'ESP32, React, TF.js' }
            ].map((item, i) => (
              <div key={i} className="bento-card p-6 md:p-8 bg-slate-900/40 border-white/5">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-brand-primary mb-4 md:mb-6" />
                <h4 className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-lg md:text-xl font-bold text-white mb-2">{item.val}</p>
                <p className="text-[10px] md:text-xs text-slate-500">{item.detail}</p>
              </div>
            ))}
         </div>
      </div>

      <section>
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
             <Users className="text-brand-accent w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Equipe Proponente</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            { name: 'Bernardo Carlos', role: 'Pesquisador em Hardware', pic: 'https://picsum.photos/seed/bc/200/200' },
            { name: 'Domingos Simão', role: 'Engenheiro de Software', pic: 'https://picsum.photos/seed/ds/200/200' }
          ].map((dev, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-8 bento-card p-8 md:p-10 group hover:bg-slate-900/60 transition-all">
              <div className="relative shrink-0">
                 <div className="absolute -inset-2 bg-brand-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <img src={dev.pic} alt={dev.name} className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="font-bold text-xl md:text-2xl text-white mb-1 tracking-tight">{dev.name}</h3>
                <p className="text-[10px] md:text-xs text-brand-accent font-bold uppercase tracking-widest mb-4 md:mb-6">{dev.role}</p>
                <div className="flex justify-center sm:justify-start gap-5">
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 md:mt-40 p-10 md:p-20 bento-card text-center bg-brand-primary/5 border-brand-primary/10">
        <div className="inline-flex p-3 md:p-4 rounded-2xl md:rounded-3xl bg-slate-950/80 mb-6 md:mb-10 border border-white/5">
           <Building2 className="w-6 h-6 md:w-8 md:h-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl md:text-4xl font-display font-bold mb-6 md:mb-8 text-white tracking-tight">Contribuição para a Comunidade LGA</h2>
        <p className="text-slate-400 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
          O projeto continua em fase de expansão. Nosso próximo marco é a integração de expressões faciais via Visão Computacional para aumentar a fidelidade da tradução.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <button className="bg-brand-accent text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_-5px_rgba(249,115,22,0.3)] text-sm md:text-base">
            Documentação TCC
          </button>
          <button className="bg-slate-900 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold border border-white/10 hover:bg-slate-800 transition-all text-sm md:text-base">
            Repositório Institucional
          </button>
        </div>
      </div>
      <div className="mt-20 text-center">
         <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.5em]">IMPS - SmartBits Institute • Luanda, Angola • 2026</p>
      </div>
    </div>
  );
}

