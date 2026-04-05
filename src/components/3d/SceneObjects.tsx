import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useExperience } from '../../hooks/useExperience';

function getScaleFactor(index: number, progress: number) {
  const dist = Math.abs(index - progress);
  return Math.max(0.001, 1 - dist);
}

function SpineVisualizer({ index }: { index: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targetProgress = useExperience((s) => s.targetProgress);

  useFrame((state) => {
    const scaleFactor = getScaleFactor(index, targetProgress);
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);
      if (scaleFactor > 0.1) groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    // Always update instance matrices to avoid uninitialized/bad matrices
    // which can produce giant bounding extents / blank canvases on some devices.
    if (meshRef.current) {
      for (let i = 0; i < 8; i++) {
        dummy.position.set(0, (i - 3.5) * 0.4, 0);
        // apply the scaleFactor to each instance so the mesh appears/vanishes
        // smoothly and never leaves an uninitialized transform behind.
        dummy.scale.set(scaleFactor, scaleFactor, scaleFactor);
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

function MedicalTablet({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetProgress = useExperience((s) => s.targetProgress);

  useFrame(() => {
    if (groupRef.current) {
      const scaleFactor = getScaleFactor(index, targetProgress);
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);
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

function PulsingNodes({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetProgress = useExperience((s) => s.targetProgress);

  useFrame(({ clock }) => {
    const scaleFactor = getScaleFactor(index, targetProgress);
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);
      if (scaleFactor > 0.01) {
        const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
        groupRef.current.children.forEach((c) => c.scale.setScalar(pulse));
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

function IsometricBlocks({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetProgress = useExperience((s) => s.targetProgress);

  useFrame(({ clock }) => {
    const scaleFactor = getScaleFactor(index, targetProgress);
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);
      if (scaleFactor > 0.01) {
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

function ReactiveWaveform({ index }: { index: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targetProgress = useExperience((s) => s.targetProgress);

  useFrame(({ clock }) => {
    const scaleFactor = getScaleFactor(index, targetProgress);
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);
    }

    // Always update the waveform instance matrices and factor in the current
    // scaleFactor so elements do not leave behind large/uninitialized bounds.
    if (meshRef.current) {
      const time = clock.elapsedTime;
      for (let i = 0; i < 16; i++) {
        const bassTransient = Math.pow(Math.sin(time * 3 + i * 0.5), 4) * 1.8;
        const lowPassMuffle = Math.sin(time * 0.8 + i) * 0.3;
        // combine dynamic Y pulse with the global scale factor
        const scaleY = (1 + bassTransient + lowPassMuffle) * scaleFactor;

        dummy.position.set((i - 7.5) * 0.3, 0, 0);
        dummy.scale.set(scaleFactor, scaleY, scaleFactor);
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

export default function SceneObjects() {
  const glitchTrigger = useExperience((s) => s.glitchTrigger);
  const glitchActive = useExperience((s) => s.glitchActive);
  const activeIndex = useExperience((s) => s.activeIndex);
  const rootGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (rootGroupRef.current) {
      const rotLerp = glitchActive ? 0.4 : 0.05;
      const posLerp = glitchActive ? 0.6 : 0.1;

      rootGroupRef.current.rotation.z = THREE.MathUtils.lerp(rootGroupRef.current.rotation.z, 0, rotLerp);
      rootGroupRef.current.position.x = THREE.MathUtils.lerp(rootGroupRef.current.position.x, 0, posLerp);

      // Only show the scene objects when user has reached the projects section (activeIndex > 0)
      rootGroupRef.current.visible = activeIndex > 0;
    }
  });

  React.useEffect(() => {
    if (glitchTrigger > 0 && rootGroupRef.current) {
      rootGroupRef.current.rotation.z = (Math.random() - 0.5) * 0.2;
      rootGroupRef.current.position.x = (Math.random() - 0.5) * 0.5;
    }
  }, [glitchTrigger]);

  return (
    <group ref={rootGroupRef}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      <SpineVisualizer index={1} />
      <MedicalTablet index={2} />
      <PulsingNodes index={3} />
      <IsometricBlocks index={4} />
      <ReactiveWaveform index={5} />
    </group>
  );
}
