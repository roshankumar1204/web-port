"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Core({ calm }) {
  const ref = useRef();
  useFrame((state, dt) => {
    if (!ref.current || calm) return;
    ref.current.rotation.y += dt * 0.15;
    ref.current.rotation.x += dt * 0.05;
  });
  return (
    <mesh ref={ref} scale={1.35}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        color="#101018"
        metalness={1}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={1}
        iridescenceIOR={1.4}
        iridescenceThicknessRange={[100, 800]}
        distort={calm ? 0.2 : 0.38}
        speed={calm ? 0 : 1.4}
      />
    </mesh>
  );
}

function Ring({ radius, tilt, speed, color, opacity = 0.6, calm }) {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current && !calm) ref.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.006, 8, 200]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Orbiting "data packets": a nod to BLE notifications streaming off a sensor
function DataHalo({ count = 900, calm }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.3 + Math.pow(Math.random(), 2) * 1.6;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.35 * (r - 1.8);
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current && !calm) ref.current.rotation.y -= dt * 0.08;
  });

  return (
    <group rotation={[0.42, 0, -0.25]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#c6ff3d" transparent opacity={0.85} sizeAttenuation depthWrite={false} toneMapped={false} />
      </points>
    </group>
  );
}

function Rig() {
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, dt) => {
    target.set(state.pointer.x * 0.6, state.pointer.y * 0.4, 6.2);
    state.camera.position.lerp(target, 1 - Math.exp(-dt * 2.5));
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Shrinks and lifts the scene on narrow screens so it frames the name instead of covering it
function Responsive({ children }) {
  const width = useThree((s) => s.size.width);
  const mobile = width < 768;
  return (
    <group scale={mobile ? 0.62 : 0.88} position={mobile ? [0, 1.25, 0] : [0.3, 0, 0]}>
      {children}
    </group>
  );
}

export default function HeroScene({ active = true, calm = false }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#8b5cf6" />

      <Responsive>
      <Float speed={calm ? 0 : 1.6} rotationIntensity={0.5} floatIntensity={0.9}>
        <Core calm={calm} />
      </Float>

      <Ring radius={2.05} tilt={[1.25, 0.2, 0]} speed={0.4} color="#c6ff3d" opacity={0.7} calm={calm} />
      <Ring radius={2.45} tilt={[1.0, -0.5, 0.3]} speed={-0.25} color="#8b5cf6" opacity={0.55} calm={calm} />
      <Ring radius={2.9} tilt={[1.6, 0.6, -0.2]} speed={0.15} color="#ffffff" opacity={0.15} calm={calm} />
      <DataHalo calm={calm} />
      </Responsive>
      <Sparkles count={60} scale={[9, 6, 4]} size={1.6} speed={calm ? 0 : 0.3} color="#ffffff" opacity={0.5} />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={6} color="#c6ff3d" position={[-5, 0, -2]} rotation-y={Math.PI / 2} scale={[8, 1.5, 1]} />
        <Lightformer form="rect" intensity={6} color="#8b5cf6" position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={3} color="#ffffff" position={[0, 0, 6]} scale={3} />
      </Environment>

      {!calm && <Rig />}
    </Canvas>
  );
}
