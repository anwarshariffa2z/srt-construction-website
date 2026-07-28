"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BuildingModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire house model
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={1.2}>
      {/* Ground plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#1a1712" opacity={0.3} transparent />
      </mesh>

      {/* Main Ground Floor Block */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.5, 3]} />
        <meshStandardMaterial color="#e5ddcd" />
      </mesh>

      {/* Ground Floor Wooden Feature Wall */}
      <mesh position={[-1.5, 0.75, 1.51]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.5, 0.05]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* Ground Floor Main Entrance Glass */}
      <mesh position={[0.5, 0.75, 1.51]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.2, 0.05]} />
        <meshStandardMaterial color="#222" opacity={0.8} transparent metalness={0.9} roughness={0.1} />
      </mesh>

      {/* First Floor Cantilevered Slab */}
      <mesh position={[0, 1.55, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.1, 4.5]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* First Floor Main Block */}
      <mesh position={[-0.5, 2.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.5, 3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* First Floor Balcony Glass Railing */}
      <mesh position={[0, 1.8, 2.7]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 0.5, 0.05]} />
        <meshStandardMaterial color="#88ccff" opacity={0.3} transparent metalness={0.9} roughness={0.1} />
      </mesh>
      
      <mesh position={[2.225, 1.8, 1.6]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.5, 2.2]} />
        <meshStandardMaterial color="#88ccff" opacity={0.3} transparent metalness={0.9} roughness={0.1} />
      </mesh>

      {/* First Floor Large Panoramic Window */}
      <mesh position={[-0.5, 2.35, 1.51]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.2, 0.05]} />
        <meshStandardMaterial color="#222" opacity={0.8} transparent metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Second Floor / Terrace Slab overhang */}
      <mesh position={[0, 3.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.1, 4]} />
        <meshStandardMaterial color="#c9a468" />
      </mesh>

      {/* Decorative Pillar 1 */}
      <mesh position={[1.8, 0.75, 1.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Decorative Pillar 2 */}
      <mesh position={[1.8, 2.35, 1.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Landscape Planter Box */}
      <mesh position={[1.5, 0.2, 2]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.4, 0.5]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Landscape Plant (Greenery) */}
      <mesh position={[1.5, 0.6, 2]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#2e5c31" />
      </mesh>
      <mesh position={[1.2, 0.5, 2]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#3a753e" />
      </mesh>

    </group>
  );
}
