'use client';

import { Environment, Lightformer, Line, OrbitControls, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { MathUtils, type Group, type MeshPhysicalMaterial } from 'three';
import { layers, type Motif } from '@/data/layers';

type V3 = [number, number, number];

const GAP = 0.66; // jarak antar layer
const W = 3.0; // lebar panel
const D = 2.0; // kedalaman panel
const T = 0.08; // tebal panel
const BASE = '#7f81ff';
const HI = '#d4d5ff';

const rect = (w: number, d: number, y: number): V3[] => {
  const x = w / 2;
  const z = d / 2;
  return [[-x, y, -z], [x, y, -z], [x, y, z], [-x, y, z], [-x, y, -z]];
};

function Bar({ p, s, c }: { p: V3; s: V3; c: string }) {
  return (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.55} toneMapped={false} />
    </mesh>
  );
}

function Dot({ p, r, c }: { p: V3; r: number; c: string }) {
  return (
    <mesh position={p}>
      <sphereGeometry args={[r, 16, 16]} />
      <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.7} toneMapped={false} />
    </mesh>
  );
}

// Jaringan 3-4-3 untuk motif Machine Learning
const NET_X = [-0.9, 0, 0.9];
const NET_Z = [[-0.35, 0.35], [-0.6, 0, 0.6], [-0.35, 0.35]];
const nodes: V3[][] = NET_X.map((x, i) => NET_Z[i].map((z) => [x, 0.16, z] as V3));
const links: [V3, V3][] = [];
for (let i = 0; i < nodes.length - 1; i++) for (const a of nodes[i]) for (const b of nodes[i + 1]) links.push([a, b]);

function Pattern({ kind, c }: { kind: Motif; c: string }) {
  const y0 = T / 2;
  switch (kind) {
    case 'ui':
      return (
        <>
          <Bar p={[0, y0 + 0.02, -0.6]} s={[2.4, 0.04, 0.22]} c={c} />
          {[-0.8, 0, 0.8].map((x) => <Bar key={x} p={[x, y0 + 0.02, 0.18]} s={[0.7, 0.04, 0.75]} c={c} />)}
        </>
      );
    case 'server':
      return (
        <>
          {[-0.55, 0, 0.55].map((z) => (
            <group key={z}>
              <Bar p={[-0.15, y0 + 0.05, z]} s={[2.0, 0.1, 0.3]} c={c} />
              <Dot p={[1.0, y0 + 0.12, z]} r={0.06} c={c} />
            </group>
          ))}
        </>
      );
    case 'chart':
      return (
        <>
          {[0.3, 0.6, 0.45, 0.95, 0.7].map((h, i) => <Bar key={i} p={[-1.0 + i * 0.5, y0 + h / 2, 0.1]} s={[0.28, h, 0.28]} c={c} />)}
        </>
      );
    case 'network':
      return (
        <>
          {links.map(([a, b], i) => <Line key={i} points={[a, b]} color={c} lineWidth={1} transparent opacity={0.6} />)}
          {nodes.flat().map((p, i) => <Dot key={i} p={p} r={0.09} c={c} />)}
        </>
      );
    case 'vision':
      return (
        <>
          <Line points={rect(2.2, 1.3, y0 + 0.01)} color={c} lineWidth={1} transparent opacity={0.6} />
          <Line points={rect(0.8, 0.55, y0 + 0.01).map(([x, y, z]) => [x + 0.25, y, z - 0.1] as V3)} color={c} lineWidth={2} />
          <Bar p={[0.25, y0 + 0.07, -0.1]} s={[0.4, 0.12, 0.28]} c={c} />
        </>
      );
  }
}

interface LayerProps {
  index: number;
  hovered: number;
  onHover: (i: number) => void;
  onSelect?: (i: number) => void; // kosong = layer tidak bisa diklik
}

function Layer({ index, hovered, onHover, onSelect }: LayerProps) {
  const group = useRef<Group>(null);
  const mat = useRef<MeshPhysicalMaterial>(null);
  const baseY = ((layers.length - 1) / 2 - index) * GAP;
  const active = hovered === index;

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Layer di atas yang di-hover ikut terangkat, jadi tumpukan "terbuka".
    const lift = hovered >= 0 && index < hovered ? 0.34 : active ? 0.06 : 0;
    g.position.y = MathUtils.damp(g.position.y, baseY + lift, 6, delta);
    if (mat.current) mat.current.emissiveIntensity = MathUtils.damp(mat.current.emissiveIntensity, active ? 0.45 : 0.06, 8, delta);
  });

  const c = active ? HI : BASE;
  return (
    <group
      ref={group}
      position={[0, baseY, 0]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(index); }}
      onPointerOut={() => onHover(-1)}
      onClick={onSelect ? (e) => { e.stopPropagation(); if (e.delta <= 4) onSelect(index); } : undefined} // delta besar = pengguna sedang drag
    >
      <RoundedBox args={[W, T, D]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial ref={mat} color="#1a1c26" metalness={0.5} roughness={0.22} transparent opacity={0.62} clearcoat={1} envMapIntensity={1.3} emissive="#5a5cff" emissiveIntensity={0.06} />
      </RoundedBox>
      <Line points={rect(W - 0.12, D - 0.12, T / 2 + 0.002)} color={c} lineWidth={active ? 2 : 1} />
      <Pattern kind={layers[index].motif} c={c} />
    </group>
  );
}

function Stack(props: Omit<LayerProps, 'index'>) {
  const group = useRef<Group>(null);
  const size = useThree((s) => s.size);
  const aspect = size.width / size.height;
  const scale = MathUtils.clamp(aspect / 0.95, 0.6, 1.2);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = MathUtils.damp(g.rotation.y, -0.6 + state.pointer.x * 0.25, 3, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12, 3, delta);
  });

  return (
    <group ref={group} scale={scale}>
      {layers.map((_, i) => <Layer key={i} index={i} {...props} />)}
    </group>
  );
}

function CanvasTweaks({ pointer }: { pointer: boolean }) {
  const el = useThree((s) => s.gl.domElement);
  useEffect(() => { el.style.touchAction = 'pan-y'; }, [el]); // scroll vertikal tetap jalan di layar sentuh
  useEffect(() => {
    el.style.cursor = pointer ? 'pointer' : '';
    return () => { el.style.cursor = ''; };
  }, [el, pointer]);
  return null;
}

interface SceneProps {
  running: boolean;
  autoRotate: boolean;
  hovered: number;
  onHover: (i: number) => void;
  onSelect?: (i: number) => void;
}

export default function HeroScene({ running, autoRotate, hovered, onHover, onSelect }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.2, 7.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={running ? 'always' : 'never'}
      onPointerMissed={() => onHover(-1)}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 5, 4]} intensity={0.7} />
      <Stack hovered={hovered} onHover={onHover} onSelect={onSelect} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[-4, 4, 3]} scale={[6, 2, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer form="rect" intensity={5} color="#4f5bff" position={[4, 0, 2]} scale={[5, 3, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer form="ring" intensity={2.5} color="#8b6bff" position={[0, 3, -4]} scale={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </Environment>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        autoRotate={autoRotate && hovered < 0}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.05}
      />
      <CanvasTweaks pointer={hovered >= 0 && Boolean(onSelect)} />
    </Canvas>
  );
}
