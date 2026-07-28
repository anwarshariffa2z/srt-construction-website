"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, ContactShadows } from '@react-three/drei';
import { BuildingModel } from './BuildingModel';

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-sm tracking-widest uppercase font-medium text-[var(--color-bronze)]">
        Loading 3D Engine...
      </div>
    </Html>
  );
}

export default function ModelViewer() {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] bg-[var(--color-background)] rounded-none overflow-hidden border border-[var(--color-stone)]">
      <Canvas
        camera={{ position: [5, 4, 6], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        <color attach="background" args={['#f6f2ea']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        
        <Suspense fallback={<LoadingFallback />}>
          <BuildingModel />
          
          {/* Subtle reflections/environment */}
          <Environment preset="city" />
          
          {/* Contact shadows for realism */}
          <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>

        {/* Orbit controls allow the user to rotate the model */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going below ground
        />
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute bottom-6 left-6 pointer-events-none">
        <p className="text-xs uppercase tracking-widest text-[var(--color-foreground-soft)]">
          Interactive 3D Preview
        </p>
        <p className="font-serif text-lg text-[var(--color-foreground)]">
          Villa Serai Prototype
        </p>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <div className="flex gap-2 items-center text-[var(--color-foreground-soft)] text-xs uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Drag to orbit &bull; Scroll to zoom
        </div>
      </div>
    </div>
  );
}
