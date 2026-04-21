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

  const connect = useCallback((ip: string) => {
    setStatus('connecting');
    setError(null);
    
    try {
      // Ensuring IP is valid and adding protocol
      const url = ip.startsWith('ws://') ? ip : `ws://${ip}`;
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        setStatus('connected');
        console.log('WebSocket Connected to', url);
      };

      ws.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data) as GloveData;
          setData(parsedData);
        } catch (err) {
          console.error('Failed to parse WebSocket data:', err);
        }
      };

      ws.current.onclose = () => {
        setStatus('disconnected');
        console.log('WebSocket Disconnected');
      };

      ws.current.onerror = () => {
        setError('Erro na conexão com ESP32');
        setStatus('disconnected');
      };
    } catch (err) {
      setError('IP Inválido');
      setStatus('disconnected');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return { data, status, error, connect, disconnect };
}
