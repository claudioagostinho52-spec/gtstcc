/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { GloveData } from '../types';

// Material de Carbono/Cromo com efeito de reflexo Unitel
const CyberMaterial = ({ color, emissive, intensity = 0.5 }: { color: string; emissive: string; intensity?: number }) => {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={intensity}
      metalness={1}
      roughness={0.15}
      clearcoat={1}
      reflectivity={1}
    />
  );
};

interface FingerSegmentProps {
  flex: number;
  length: number;
  color: string;
  isTip?: boolean;
}

const FingerSegment = ({ flex, length, color, isTip = false }: FingerSegmentProps) => {
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      // CALIBRAÇÃO 0.0 - 1.0: 
      // Multiplicamos por Math.PI / 2 para que 1.0 signifique 90 graus de dobra
      const targetRotation = flex * (Math.PI / 1.8); 
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotation, 0.15);
    }
  });

  return (
    <group ref={group}>
      {/* Articulação (Joint) - Estilo Esfera de Energia */}
      <mesh>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </mesh>

      {/* Falange (Bone) - Design Industrial */}
      <mesh position={[0, length / 2, 0]}>
        <capsuleGeometry args={[0.055, length, 12, 24]} />
        <CyberMaterial color="#0a0a0a" emissive="#3b82f6" intensity={0.05} />
      </mesh>

      {/* Detalhe de Led Lateral no Dedo */}
      <mesh position={[0, length / 2, 0.04]}>
        <boxGeometry args={[0.02, length * 0.6, 0.01]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {!isTip && (
        <group position={[0, length, 0]}>
          <FingerSegment flex={flex} length={length * 0.8} color={color} isTip={length < 0.2} />
        </group>
      )}
    </group>
  );
};

const CyberHand = ({ data }: { data: GloveData | null }) => {
  const group = useRef<THREE.Group>(null);
  // Garante que o array de flex existe e tem 5 posições
  const flexValues = data?.flex || [0, 0, 0, 0, 0];

  useFrame(() => {
    if (group.current && data?.imu?.accel) {
      // Movimento suave baseado no acelerómetro do ESP32
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, data.imu.accel.y * 0.2, 0.1);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -data.imu.accel.x * 0.2, 0.1);
    }
  });

  return (
    <group ref={group} rotation={[Math.PI / -2.5, 0, 0]}>
      {/* Chassi da Palma - Hexagonal Style */}
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
  <cylinderGeometry args={[0.45, 0.35, 0.15, 6]} />
  <CyberMaterial color="#111827" emissive="#000000" />
</mesh>
      
      {/* Placa de Identificação LGA Unitel */}
      <mesh position={[0, -0.4, 0.08]}>
        <boxGeometry args={[0.4, 0.2, 0.02]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
      </mesh>

      {/* DEDOS - Calibrados para os índices do array [0,1,2,3,4] */}
      
      {/* Polegar (Thumb) */}
      <group position={[-0.4, -0.3, 0]} rotation={[0, 0.6, -0.4]}>
        <FingerSegment flex={flexValues[0]} length={0.25} color="#f97316" />
      </group>
      
      {/* Indicador */}
      <group position={[-0.25, 0, 0]}>
        <FingerSegment flex={flexValues[1]} length={0.42} color="#3b82f6" />
      </group>
      
      {/* Médio */}
      <group position={[-0.05, 0.05, 0]}>
        <FingerSegment flex={flexValues[2]} length={0.48} color="#3b82f6" />
      </group>
      
      {/* Anelar */}
      <group position={[0.15, 0, 0]}>
        <FingerSegment flex={flexValues[3]} length={0.42} color="#3b82f6" />
      </group>
      
      {/* Mínimo */}
      <group position={[0.35, -0.1, 0]}>
        <FingerSegment flex={flexValues[4]} length={0.32} color="#3b82f6" />
      </group>
    </group>
  );
};

export function Hand3D({ data }: { data: GloveData | null }) {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-950 to-brand-bg rounded-[32px] overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 35 }}>
        <PerspectiveCamera makeDefault />
        <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 1.5} 
            minPolarAngle={Math.PI / 3}
        />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
        
        <Environment preset="night" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CyberHand data={data} />
        </Float>
        
        <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2} />
      </Canvas>
      
      {/* Overlay de Status quando não há dados */}
      {!data && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 pointer-events-none">
          <div className="flex flex-col items-center">
             <div className="status-dot text-brand-accent mb-4 scale-150" />
             <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] animate-pulse">
               Aguardando Telemetria...
             </span>
          </div>
        </div>
      )}
    </div>
  );
}