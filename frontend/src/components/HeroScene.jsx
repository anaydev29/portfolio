import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GlowingSphere, WireframeTorus, GlowingOctahedron } from './FloatingGeometry';
import {
  EffectComposer,
  Bloom,
} from '@react-three/postprocessing';

function MouseTracker() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;
    mouse.current.x += (pointer.x * 0.5 - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y * 0.3 - mouse.current.y) * 0.05;
    camera.position.x = mouse.current.x;
    camera.position.y = mouse.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} color="#818cf8" intensity={2} />
      <pointLight position={[-10, -5, 5]} color="#6366f1" intensity={1.5} />
      <pointLight position={[0, 5, -10]} color="#a78bfa" intensity={1} />

      <GlowingSphere position={[-3.5, 1.5, -2]} color="#6366f1" size={1.2} speed={0.8} distort={0.5} />
      <GlowingSphere position={[4, -1, -3]} color="#818cf8" size={0.7} speed={1.2} distort={0.3} />
      <WireframeTorus position={[3, 2, -1]} color="#a78bfa" size={0.9} speed={0.6} />
      <WireframeTorus position={[-2, -2.5, -4]} color="#6366f1" size={0.5} speed={1} />
      <GlowingOctahedron position={[0, 0, -2]} color="#818cf8" size={1.5} speed={0.5} />
      <GlowingOctahedron position={[-4, -1, -5]} color="#a78bfa" size={0.6} speed={0.9} />
      <GlowingSphere position={[2, -3, -1]} color="#c4b5fd" size={0.4} speed={1.5} distort={0.2} />

      <MouseTracker />
    </>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
