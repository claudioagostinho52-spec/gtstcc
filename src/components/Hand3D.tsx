/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { GloveData } from '../types';

// High-tech procedural material with grid pattern
const CyberMaterial = ({ color, emissive, intensity = 0.5 }: { color: string; emissive: string; intensity?: number }) => {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={intensity}
      metalness={0.9}
      roughness={0.1}
      clearcoat={1}
      clearcoatRoughness={0.1}
      reflectivity={1}
      sheen={1}
      sheenRoughness={0.2}
      sheenColor={color}
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
      const targetRotation = (flex / 1024) * (Math.PI / 2.2);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotation, 0.1);
    }
  });

  return (
    <group ref={group}>
      {/* Joint Sphere - High Glow */}
      <mesh>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1.5} 
          toneMapped={false} 
        />
      </mesh>

      {/* Bone / Phalanx - Carbon Fiber Look */}
      <mesh position={[0, length / 2, 0]}>
        <capsuleGeometry args={[0.05, length, 8, 16]} />
        <CyberMaterial color="#0a0a0a" emissive="#1e293b" intensity={0.1} />
      </mesh>

      {/* Internal Core Glow */}
      <mesh position={[0, length / 2, 0]}>
        <capsuleGeometry args={[0.03, length, 4, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* External Guard / Shell Segment */}
      {!isTip && (
        <mesh position={[0, length / 4, 0.04]} rotation={[0.2, 0, 0]}>
           <boxGeometry args={[0.08, length / 2, 0.02]} />
           <CyberMaterial color="#1e293b" emissive={color} intensity={0.05} />
        </mesh>
      )}

      {!isTip && (
        <group position={[0, length, 0]}>
          <FingerSegment flex={flex} length={length * 0.8} color={color} isTip={length < 0.2} />
        </group>
      )}
    </group>
  );
};

interface ProceduralHandProps {
  data: GloveData | null;
}

const CyberHand = ({ data }: ProceduralHandProps) => {
  const group = useRef<THREE.Group>(null);
  const flex = data?.flex || [0, 0, 0, 0, 0];

  useFrame(() => {
    if (group.current && data) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, data.imu.accel.x * 0.15, 0.1);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -data.imu.accel.y * 0.15, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, data.imu.gyro.z * 0.05, 0.1);
    }
  });

  return (
    <group ref={group}>
      {/* Central Palm - Brushed Chrome Chassis */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.2]} />
        <CyberMaterial color="#050505" emissive="#000000" />
      </mesh>
      
      {/* Core Unit - Polished Glass / Energy Cell */}
      <mesh position={[0, -0.4, 0.08]}>
        <boxGeometry args={[0.5, 0.6, 0.06]} />
        <meshPhysicalMaterial 
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          roughness={0}
          transmission={0.5}
          thickness={1}
        />
      </mesh>

      {/* Identification Plate (LGA Unit) */}
      <mesh position={[0, -0.65, 0.11]}>
        <boxGeometry args={[0.3, 0.05, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Lateral Trim - Safety Orange */}
      <mesh position={[0.36, -0.4, 0]}>
        <boxGeometry args={[0.03, 0.6, 0.12]} />
        <CyberMaterial color="#f97316" emissive="#f97316" />
      </mesh>

      {/* Finger Hubs */}
      <group position={[-0.35, -0.3, 0]} rotation={[0, 0.5, 0]}>
        <FingerSegment flex={flex[0]} length={0.3} color="#f97316" />
      </group>
      
      <group position={[-0.25, 0, 0]}>
        <FingerSegment flex={flex[1]} length={0.45} color="#3b82f6" />
      </group>
      
      <group position={[-0.05, 0, 0]}>
        <FingerSegment flex={flex[2]} length={0.5} color="#3b82f6" />
      </group>
      
      <group position={[0.15, 0, 0]}>
        <FingerSegment flex={flex[3]} length={0.45} color="#3b82f6" />
      </group>
      
      <group position={[0.35, 0, 0]}>
        <FingerSegment flex={flex[4]} length={0.35} color="#3b82f6" />
      </group>
    </group>
  );
};

export function Hand3D({ data }: ProceduralHandProps) {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <Canvas shadows camera={{ position: [0, 0, 3.5], fov: 38 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 3.6]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!data} autoRotateSpeed={0.3} />
        
        <ambientLight intensity={0.2} />
        <rectAreaLight width={5} height={5} intensity={5} color="#3b82f6" position={[5, 5, 5]} rotation={[0.4, 0.4, 0]} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
        
        <Environment preset="studio" />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
          <CyberHand data={data} />
        </Float>
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.6} 
          scale={7} 
          blur={2.5} 
          far={4} 
        />
      </Canvas>
      
      {!data && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[6px] z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-5">
             <div className="flex gap-2 items-end h-8">
                {[0, 150, 300, 450].map((delay) => (
                  <div 
                    key={delay}
                    className="w-2 bg-brand-primary rounded-full animate-[bounce_1.2s_infinite]"
                    style={{ animationDelay: `${delay}ms`, height: `${Math.random() * 20 + 20}px` }}
                  />
                ))}
             </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] font-mono mb-1">Iniciando Biometria Híbrida</span>
              <span className="text-[8px] text-brand-primary/60 font-mono animate-pulse">SMARTBITS PROTOCOL v4.0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

