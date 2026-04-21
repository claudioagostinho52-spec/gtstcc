/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { GloveData } from '../types';

export function useWebSocket() {
  const [data, setData] = useState<GloveData | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback((ip: string) => {
    // Evita múltiplas tentativas de conexão simultâneas
    if (ws.current?.readyState === WebSocket.OPEN || ws.current?.readyState === WebSocket.CONNECTING) return;

    setStatus('connecting');
    setError(null);
    
    try {
      // Porta 81 para WebSocket no ESP32
      const url = `ws://${ip}:81`;
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setStatus('connected');
        setError(null);
        console.log('✅ Conectado ao ESP32:', url);
        if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      };

      ws.current.onmessage = (event) => {
        try {
          const rawData = JSON.parse(event.data);
          
          // Formata os dados garantindo que o 'timestamp' e todas as chaves existam
          const formattedData: GloveData = {
            flex: Array.isArray(rawData.f) ? rawData.f.map(Number) : [0, 0, 0, 0, 0],
            imu: {
              accel: { 
                x: Number(rawData.ax) || 0, 
                y: Number(rawData.ay) || 0, 
                z: Number(rawData.az) || 0 
              },
              gyro: { 
                x: Number(rawData.gx) || 0, 
                y: Number(rawData.gy) || 0, 
                z: Number(rawData.gz) || 0 
              }
            },
            timestamp: Date.now() // Resolve o erro ts(2741)
          };
          
          setData(formattedData);
        } catch (err) {
          console.warn('⚠️ Erro ao processar JSON do ESP32:', err);
        }
      };

      ws.current.onclose = () => {
        setStatus('disconnected');
        console.log('❌ Conexão WebSocket encerrada.');
        
        // Tentativa de reconexão automática após 3 segundos
        reconnectTimeout.current = setTimeout(() => {
          console.log('🔄 Tentando reconectar...');
          connect(ip);
        }, 3000);
      };

      ws.current.onerror = () => {
        setError('Falha na comunicação. Verifique o Wi-Fi da luva.');
        setStatus('disconnected');
      };

    } catch (err) {
      setError('IP Inválido');
      setStatus('disconnected');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    if (ws.current) {
      ws.current.onclose = null; // Evita reconexão automática ao fechar manualmente
      ws.current.close();
      ws.current = null;
    }
    setStatus('disconnected');
  }, []);

  // Limpeza ao desmontar o componente
  useEffect(() => {
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (ws.current) ws.current.close();
    };
  }, []);

  return { data, status, error, connect, disconnect };
}