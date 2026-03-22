import { useRef, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';

import * as THREE from 'three';

/* ─── Shared cursor hook ─── */
const mouseState = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

/* ─── Wireframe Globe ─── */
function WireframeGlobe() {
  const globe = useRef();
  const innerGlobe = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth cursor follow
    mouseState.smoothX += (mouseState.x - mouseState.smoothX) * 0.03;
    mouseState.smoothY += (mouseState.y - mouseState.smoothY) * 0.03;

    if (globe.current) {
      globe.current.rotation.y = t * 0.12 + mouseState.smoothX * 0.6;
      globe.current.rotation.x = 0.15 + mouseState.smoothY * 0.4;
      globe.current.position.x = mouseState.smoothX * 0.5;
      globe.current.position.y = mouseState.smoothY * 0.3;
    }
    if (innerGlobe.current) {
      innerGlobe.current.rotation.y = -t * 0.08 + mouseState.smoothX * 0.3;
      innerGlobe.current.rotation.x = -0.1 - mouseState.smoothY * 0.2;
    }
  });

  return (
    <group>
      {/* Outer wireframe sphere - Optimized segments */}
      <mesh ref={globe}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner wireframe sphere - Optimized segments */}
      <mesh ref={innerGlobe}>
        <sphereGeometry args={[1.7, 12, 12]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Latitude rings */}
      <Ring radius={2.22} color="#c4b5fd" opacity={0.25} rotX={Math.PI / 2} />
      <Ring radius={2.22} color="#a5b4fc" opacity={0.15} rotX={Math.PI / 3} />
      <Ring radius={2.22} color="#818cf8" opacity={0.2} rotX={Math.PI / 5} />
    </group>
  );
}

function Ring({ radius, color, opacity, rotX = 0 }) {
  return (
    <mesh rotation={[rotX, 0, 0]}>
      {/* Optimized torus segments */}
      <torusGeometry args={[radius, 0.008, 4, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* ─── Particle Constellation ─── */
function ParticleConstellation({ count = 80 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { viewport } = useThree();

  // Generate random particles in a sphere
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.002
      ),
      size: 0.02 + Math.random() * 0.03,
    }));
  }, [count]);

  const posArray = useMemo(() => new Float32Array(count * 3), [count]);
  
  // Line connections buffer
  const maxLines = 150; // Reduced lines
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const cursorWorld = new THREE.Vector3(
      mouseState.smoothX * viewport.width * 0.3,
      mouseState.smoothY * viewport.height * 0.3,
      0
    );

    // Update particle positions
    particles.forEach((p, i) => {
      p.pos.add(p.vel);
      const toCursor = cursorWorld.clone().sub(p.pos);
      if (toCursor.length() < 4) {
        p.pos.add(toCursor.multiplyScalar(0.002));
      }
      ['x', 'y', 'z'].forEach((axis, ai) => {
        const limit = ai === 2 ? 2.5 : (ai === 0 ? 4 : 3);
        if (Math.abs(p.pos[axis]) > limit) p.vel[axis] *= -1;
      });

      posArray[i * 3] = p.pos.x;
      posArray[i * 3 + 1] = p.pos.y;
      posArray[i * 3 + 2] = p.pos.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Build constellation lines
    let lineIdx = 0;
    const connectionDist = 1.8;
    for (let i = 0; i < count && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
        const dx = particles[i].pos.x - particles[j].pos.x;
        const dy = particles[i].pos.y - particles[j].pos.y;
        const dz = particles[i].pos.z - particles[j].pos.z;
        if (dx * dx + dy * dy + dz * dz < connectionDist * connectionDist) {
          const base = lineIdx * 6;
          linePositions[base] = particles[i].pos.x;
          linePositions[base + 1] = particles[i].pos.y;
          linePositions[base + 2] = particles[i].pos.z;
          linePositions[base + 3] = particles[j].pos.x;
          linePositions[base + 4] = particles[j].pos.y;
          linePositions[base + 5] = particles[j].pos.z;
          lineIdx++;
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={posArray} count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#818cf8" size={0.06} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={linePositions} count={maxLines * 2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#a5b4fc" transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ─── Cursor Glow Dot ─── */
function CursorGlow() {
  const mesh = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.position.x = mouseState.smoothX * viewport.width * 0.3;
    mesh.current.position.y = mouseState.smoothY * viewport.height * 0.3;
    mesh.current.position.z = 1;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={3} transparent opacity={0.9} />
    </mesh>
  );
}

/* ─── Scene Composition ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#a5b4fc" intensity={1.5} />
      <pointLight position={[-4, -3, 4]} color="#c4b5fd" intensity={1} />

      <WireframeGlobe />
      <ParticleConstellation count={60} />
      <CursorGlow />
    </>
  );
}

export default function HeroCursorScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
