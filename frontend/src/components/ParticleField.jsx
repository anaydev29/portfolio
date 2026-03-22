import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1500 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      const speed = 0.01 + Math.random() * 0.02;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, offset });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const sizes = useMemo(() => {
    const s = [];
    for (let i = 0; i < count; i++) {
      s.push(0.015 + Math.random() * 0.04);
    }
    return s;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const { x, y, z, speed, offset } = particle;
      dummy.position.set(
        x + Math.sin(time * speed + offset) * 0.5,
        y + Math.cos(time * speed + offset) * 0.3,
        z + Math.sin(time * speed * 0.5 + offset) * 0.2
      );
      const scale = sizes[i];
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#a5b4fc" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function FloatingLight() {
  const light = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    light.current.position.x = Math.sin(t * 0.3) * 8;
    light.current.position.y = Math.cos(t * 0.2) * 6;
    light.current.position.z = Math.sin(t * 0.4) * 4;
  });

  return <pointLight ref={light} color="#c7d2fe" intensity={2} distance={30} />;
}

export default function ParticleField() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <FloatingLight />
        <Particles />
      </Canvas>
    </div>
  );
}
