import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SpineVisualizer({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetScale = active ? 1 : 0.001; 
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      if (active) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    if (meshRef.current && active) {
      for (let i = 0; i < 8; i++) {
        dummy.position.set(0, (i - 3.5) * 0.4, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, 8]}>
        <cylinderGeometry args={[0.2, 0.4, 0.3, 8]} />
        <meshBasicMaterial color="#06b6d4" wireframe />
      </instancedMesh>
    </group>
  );
}

function MedicalTablet({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      const targetScale = active ? 1 : 0.001;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });
  return (
    <group ref={groupRef}>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={2}>
        <mesh>
          <boxGeometry args={[2.5, 3.5, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.3, 3.3]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

function PulsingNodes({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const targetScale = active ? 1 : 0.001;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      if (active) {
        const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
        groupRef.current.children.forEach(c => c.scale.setScalar(pulse));
      }
    }
  });

  return (
    <group ref={groupRef}>
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, Math.sin(x) * 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial color="#38bdf8" speed={5} distort={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function IsometricBlocks({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const targetScale = active ? 1 : 0.001;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      if (active) {
        groupRef.current.rotation.y = clock.elapsedTime * 0.5;
        groupRef.current.rotation.x = 0.5;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[(i % 2) - 0.5, Math.floor(i / 2) - 0.5, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshBasicMaterial color="#818cf8" wireframe />
        </mesh>
      ))}
    </group>
  );
}

function ReactiveWaveform({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const targetScale = active ? 1 : 0.001;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    
    if (meshRef.current && active) {
      const time = clock.elapsedTime;
      for (let i = 0; i < 16; i++) {
        const bassTransient = Math.pow(Math.sin(time * 3 + i * 0.5), 4) * 1.8;
        const lowPassMuffle = Math.sin(time * 0.8 + i) * 0.3;
        const scaleY = 1 + bassTransient + lowPassMuffle;
        
        dummy.position.set((i - 7.5) * 0.3, 0, 0);
        dummy.scale.set(1, scaleY, 1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, 16]}>
        <boxGeometry args={[0.08, 1, 0.08]} />
        <meshBasicMaterial color="#c084fc" />
      </instancedMesh>
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.mouse.x * Math.PI) / 10, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * Math.PI) / 10, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SceneObjects({ activeIndex }: { activeIndex: number }) {
  return (
    <group position-x={typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 0} position-y={typeof window !== 'undefined' && window.innerWidth < 768 ? -1.5 : 0}>
      <SpineVisualizer active={activeIndex === 0} />
      <MedicalTablet active={activeIndex === 1} />
      <PulsingNodes active={activeIndex === 2} />
      <IsometricBlocks active={activeIndex === 3} />
      <ReactiveWaveform active={activeIndex === 4} />
      <Rig />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#06b6d4" />
    </group>
  );
}