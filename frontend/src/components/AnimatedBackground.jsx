import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

function MorphingSphere() {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.1;
    mesh.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={mesh} scale={3}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#a5b4fc"
        emissive="#818cf8"
        emissiveIntensity={0.1}
        roughness={0.3}
        metalness={0.8}
        distort={0.4}
        speed={1.5}
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

export default function AnimatedBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} color="#818cf8" intensity={2} />
          <MorphingSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
