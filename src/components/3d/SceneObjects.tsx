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
  const activeIndex = useExperience((s) => s.activeIndex);
  const isMobile = useExperience((s) => s.isMobile);

  const cylinderArgs = useMemo(() => (isMobile ? [0.2, 0.4, 0.3, 4] : [0.2, 0.4, 0.3, 8]), [isMobile]);
  // Use an adjusted display progress: when the scroll-derived progress is
  // noticeably different from the active panel index, prefer the active
  // index so the visible model matches the panel the user is actually on.
  const displayProgress = Math.abs(activeIndex - targetProgress) > 0.6 ? activeIndex : targetProgress;

  useFrame((state) => {
    const scaleFactor = getScaleFactor(index, displayProgress);
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
        {/* @ts-ignore */}
        <cylinderGeometry args={cylinderArgs} />
        <meshBasicMaterial color="#06b6d4" wireframe />
      </instancedMesh>
    </group>
  );
}

function ClinicalCross({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetProgress = useExperience((s) => s.targetProgress);
  const activeIndex = useExperience((s) => s.activeIndex);
  const isMobile = useExperience((s) => s.isMobile);

  const ringArgs = useMemo(() => (isMobile ? [1.2, 0.02, 8, 32] : [1.2, 0.02, 16, 64]), [isMobile]);

  useFrame(({ clock }) => {
    const displayProgress = Math.abs(targetProgress - activeIndex) > 0.6 ? activeIndex : targetProgress;
    if (groupRef.current) {
      const scaleFactor = getScaleFactor(index, displayProgress);
      groupRef.current.scale.lerp(new THREE.Vector3(scaleFactor, scaleFactor, scaleFactor), 0.1);
      
      if (scaleFactor > 0.01) {
        groupRef.current.rotation.y = clock.elapsedTime * 0.4;
        groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial color="#2dd4bf" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[1.5, 0.3, 0.3]} />
          <meshStandardMaterial color="#2dd4bf" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Glowing core */}
        <mesh>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        {/* Orbiting data ring */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          {/* @ts-ignore */}
          <torusGeometry args={ringArgs} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function PulsingNodes({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetProgress = useExperience((s) => s.targetProgress);
  const activeIndex = useExperience((s) => s.activeIndex);
  const isMobile = useExperience((s) => s.isMobile);

  const sphereArgs = useMemo(() => (isMobile ? [0.3, 16, 16] : [0.3, 32, 32]), [isMobile]);

  useFrame(({ clock }) => {
    const displayProgress = Math.abs(targetProgress - activeIndex) > 0.6 ? activeIndex : targetProgress;
    const scaleFactor = getScaleFactor(index, displayProgress);
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
          {/* @ts-ignore */}
          <sphereGeometry args={sphereArgs} />
          <MeshDistortMaterial color="#38bdf8" speed={5} distort={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function IsometricBlocks({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetProgress = useExperience((s) => s.targetProgress);
  const activeIndex = useExperience((s) => s.activeIndex);

  useFrame(({ clock }) => {
    const displayProgress = Math.abs(targetProgress - activeIndex) > 0.6 ? activeIndex : targetProgress;
    const scaleFactor = getScaleFactor(index, displayProgress);
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
  const activeIndex = useExperience((s) => s.activeIndex);

  useFrame(({ clock }) => {
    const displayProgress = Math.abs(targetProgress - activeIndex) > 0.6 ? activeIndex : targetProgress;
    const scaleFactor = getScaleFactor(index, displayProgress);
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
  const isMobile = useExperience((s) => s.isMobile);
  const rootGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rootGroupRef.current) {
      const rotLerp = glitchActive ? 0.4 : 0.05;
      const posLerp = glitchActive ? 0.6 : 0.05;
      const scaleLerp = 0.08;

      let targetX = 0;
      let targetRotY = 0;
      let targetScale = isMobile ? 0.8 : 1.2; // Reduced to 1.2 for PC to fit screen

      if (!isMobile && activeIndex > 0 && activeIndex <= 5) {
        // activeIndex - 1 gives us the project index (0-based)
        // Use that to determine left/right positioning
        if ((activeIndex - 1) % 2 === 0) {
          targetX = 2.2;   // Text on left, push model right
          targetRotY = -0.15;
        } else {
          targetX = -2.2;  // Text on right, push model left
          targetRotY = 0.15;
        }
      }

      // Ensure mouse parallax effect is added on top of the base positions/rotations
      const parallaxX = state.pointer.x * 0.1;
      const parallaxY = state.pointer.y * 0.1;
      
      // Add subtle float animation on Y-axis for suspended/zero-G effect
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;

      rootGroupRef.current.rotation.z = THREE.MathUtils.lerp(rootGroupRef.current.rotation.z, 0, rotLerp);
      rootGroupRef.current.position.x = THREE.MathUtils.lerp(rootGroupRef.current.position.x, targetX + parallaxX, posLerp);
      rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, floatY, posLerp);
      
      // Lerp Y rotation smoothly
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(rootGroupRef.current.rotation.y, targetRotY + parallaxY, 0.05);
      
      // Lerp scale smoothly for PC/mobile transitions
      rootGroupRef.current.scale.x = THREE.MathUtils.lerp(rootGroupRef.current.scale.x, targetScale, scaleLerp);
      rootGroupRef.current.scale.y = THREE.MathUtils.lerp(rootGroupRef.current.scale.y, targetScale, scaleLerp);
      rootGroupRef.current.scale.z = THREE.MathUtils.lerp(rootGroupRef.current.scale.z, targetScale, scaleLerp);

      // Only show the scene objects when user has reached the projects section (activeIndex > 0)
      rootGroupRef.current.visible = activeIndex > 0;
    }
  });

  React.useEffect(() => {
    if (glitchTrigger > 0 && rootGroupRef.current) {
      const baseTargetX = !isMobile && activeIndex > 0 && activeIndex <= 5      
        ? ((activeIndex - 1) % 2 === 0 ? 2.2 : -2.2)
        : 0;

      rootGroupRef.current.rotation.z = (Math.random() - 0.5) * 0.2;
      rootGroupRef.current.position.x = baseTargetX + (Math.random() - 0.5) * 0.5;
    }
  }, [glitchTrigger, activeIndex, isMobile]);

  return (
    <group ref={rootGroupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      <SpineVisualizer index={1} />
      <ClinicalCross index={2} />
      <PulsingNodes index={3} />
      <IsometricBlocks index={4} />
      <ReactiveWaveform index={5} />
    </group>
  );
}
