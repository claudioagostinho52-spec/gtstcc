/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppView } from '../types';
import { Shield, Radio, Activity, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  status?: string;
  ip?: string;
}

export function Navbar({ currentView, setView, status = 'disconnected', ip = '192.168.1.100' }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isConnected = status === 'connected';

  const menuItems = [
    { id: 'home', label: 'Início / TCC' },
    { id: 'translator', label: 'Monitoramento' },
    { id: 'about', label: 'Equipe & Projeto' }
  ];

  const handleNav = (id: string) => {
    setView(id as AppView);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-20 flex items-center bg-brand-bg/60 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px] flex items-center justify-between">
        <button onClick={() => handleNav('home')} className="flex items-center gap-3 md:gap-4 group">
          <div className="relative">
            <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 overflow-hidden ${isConnected ? 'bg-brand-accent shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-slate-800'}`}>
              <Shield className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${isConnected ? 'text-white' : 'text-slate-500'}`} />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-display font-bold tracking-tight text-white leading-none">
              SmartGlove <span className="text-brand-accent">LGA</span>
            </h1>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">IMPS • SmartBits</span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-accent relative py-3 ${
                currentView === item.id ? 'text-brand-accent' : 'text-slate-400'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent shadow-[0_0_10px_#f97316]" 
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-5">
           <div className="hidden sm:flex flex-col items-end text-right mr-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Localização</span>
              <span className="text-[10px] text-white">Unitel Coqueiros</span>
           </div>
           
           <div className="flex items-center gap-2 md:gap-4 bg-slate-900/80 px-3 md:px-5 py-2 rounded-xl md:rounded-2xl border border-white/5 ring-1 ring-white/5">
            <div className="flex items-center gap-2 md:gap-3">
              <div className={`status-dot ${isConnected ? 'text-green-500' : 'text-red-500'}`}></div>
              <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="w-px h-3 md:h-4 bg-slate-700"></div>
            <div className="flex items-center gap-1.5 md:gap-2 text-white/40">
              <Radio className="w-3 h-3" />
              <span className="text-[10px] md:text-[11px] font-mono whitespace-nowrap hidden xs:block">{ip}</span>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl border border-white/5"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-brand-bg/95 backdrop-blur-2xl border-b border-white/10 lg:hidden p-6 z-[90]"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-lg font-display font-bold text-left py-4 px-6 rounded-2xl transition-all ${
                    currentView === item.id 
                      ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { motion, AnimatePresence } from 'motion/react';


