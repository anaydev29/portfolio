import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ position, color, size = 0.4 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={mesh} position={position} scale={size}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function OrbScene() {
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];
  const positions = [
    [0, 0, 0],
    [1.8, 1, -0.5],
    [-1.8, 0.8, -0.3],
    [1.2, -1.2, 0.2],
    [-1.5, -1, -0.4],
  ];

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#818cf8" intensity={1.5} />
      <pointLight position={[-5, -3, 3]} color="#6366f1" intensity={1} />
      {colors.map((color, i) => (
        <Orb
          key={i}
          position={positions[i]}
          color={color}
          size={i === 0 ? 0.7 : 0.3 + Math.random() * 0.2}
        />
      ))}
    </>
  );
}

export default function SkillOrb() {
  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <OrbScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
