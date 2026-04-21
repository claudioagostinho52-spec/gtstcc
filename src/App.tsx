/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home } from './components/Home';
import { Translator } from './components/Translator';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { AppView } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { useWebSocket } from './hooks/useWebSocket';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const ws = useWebSocket();

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-black bg-brand-bg">
      <Navbar 
        currentView={view} 
        setView={setView} 
        status={ws.status} 
        ip={ws.status === 'connected' ? '192.168.1.100' : 'Disconnected'} 
      />
      
      <main className="pt-24">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home setView={setView} />
            </motion.div>
          )}
          {view === 'translator' && (
            <motion.div
              key="translator"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Translator ws={ws} />
            </motion.div>
          )}
          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Status Indicator */}
      <div className="fixed bottom-6 right-6 z-[200] pointer-events-none hidden md:block">
        <div className="bento-card flex items-center gap-3 px-4 py-2 border border-brand-accent/20 bg-brand-surface/40">
          <div className={`w-2 h-2 rounded-full ${ws.status === 'connected' ? 'bg-brand-accent animate-pulse' : 'bg-red-500'}`} />
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent/80">GTS CORE {ws.status.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}


