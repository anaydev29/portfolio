import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function GlowingSphere({ position, color, size = 1, speed = 1, distort = 0.4 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15 * speed;
    mesh.current.rotation.y = t * 0.1 * speed;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} scale={size}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function WireframeTorus({ position, color, size = 1, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.2 * speed;
    mesh.current.rotation.z = t * 0.15 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position} scale={size}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function GlowingOctahedron({ position, color, size = 1, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.25 * speed;
    mesh.current.rotation.z = t * 0.1 * speed;
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.8} floatIntensity={2}>
      <mesh ref={mesh} position={position} scale={size}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

export { GlowingSphere, WireframeTorus, GlowingOctahedron };
