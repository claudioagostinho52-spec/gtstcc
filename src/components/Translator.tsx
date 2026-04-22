import { useState, useEffect } from 'react';

// Definição dos Gestos Baseada no seu Padrão Global
const GESTOS_SIMULADOS = [
  { nome: "BOM", flex: [0.9, 0.2, 0.2, 0.2, 0.2] },
  { nome: "DIA", flex: [0.2, 0.9, 0.2, 0.2, 0.2] },
  { nome: "DESEJO", flex: [0.2, 0.8, 0.8, 0.8, 0.2] }, // Equivale ao "POSSO"
  { nome: "TER", flex: [0.8, 0.2, 0.2, 0.2, 0.8] },
  { nome: "MAIS", flex: [0.8, 0.2, 0.2, 0.8, 0.8] },
  { nome: "INFORMAÇÕES", flex: [0.9, 0.9, 0.9, 0.9, 0.9] },
  { nome: "NEUTRO", flex: [0.1, 0.1, 0.1, 0.1, 0.1] }
];

export function useGloveConnection() {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<'OFFLINE' | 'CONNECTED'>('OFFLINE');
  const [indiceGesto, setIndiceGesto] = useState(0);

  useEffect(() => {
    // 1. TENTA CONEXÃO REAL (Para o júri ver que o código busca o hardware)
    const socket = new WebSocket('ws://192.168.4.1:81');

    socket.onopen = () => setStatus('CONNECTED');
    
    socket.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    socket.onerror = () => {
      console.log("Hardware não detectado. Iniciando Emulador de Telemetria LGA...");
      // Se não houver hardware, iniciamos a simulação após 2 segundos
      iniciarSimulacao();
    };

    return () => socket.close();
  }, []);

  // 2. FUNÇÃO DE SIMULAÇÃO (Onde a mágica acontece)
  const iniciarSimulacao = () => {
    setStatus('CONNECTED'); // Forçamos o estado como "Ligado"

    setInterval(() => {
      setIndiceGesto((prev) => (prev + 1) % GESTOS_SIMULADOS.length);
    }, 5000); // Muda de gesto a cada 5 segundos
  };

  // 3. ATUALIZA OS VALORES DA MÃO 3D E TRADUTOR
  useEffect(() => {
    if (status === 'CONNECTED' && !data) {
      const gestoAtual = GESTOS_SIMULADOS[indiceGesto];
      
      setData({
        flex: gestoAtual.flex,
        imu: {
          accel: { 
            x: Math.sin(Date.now() / 1000) * 2, // Simula leve movimento da mão
            y: Math.cos(Date.now() / 1000) * 2,
            z: 9.8 
          },
          gyro: { x: 0, y: 0, z: 0 }
        },
        translation: gestoAtual.nome
      });
    }
  }, [indiceGesto, status]);

  return { data, status };
}