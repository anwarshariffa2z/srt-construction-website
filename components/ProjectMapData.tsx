"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";

// Fix Leaflet's default icon path issues in Next.js
const customIconOngoing = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customIconCompleted = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PROJECTS = [
  { id: 1, name: "Luxury Villa, ECR", lat: 12.8906, lng: 80.2575, status: "Ongoing", sqft: "5,400", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Modern Duplex, Anna Nagar", lat: 13.0850, lng: 80.2101, status: "Completed", sqft: "3,200", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Premium Apartments, Adyar", lat: 13.0033, lng: 80.2555, status: "Ongoing", sqft: "12,000", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Bespoke Residence, OMR", lat: 12.9226, lng: 80.2285, status: "Completed", sqft: "4,500", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Commercial Hub, T. Nagar", lat: 13.0405, lng: 80.2337, status: "Ongoing", sqft: "8,500", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" }
];

export default function ProjectMapData() {
  // Center of Chennai
  const center: [number, number] = [13.0450, 80.2400];

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 relative z-10">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        />
        {PROJECTS.map((project) => (
          <Marker 
            key={project.id} 
            position={[project.lat, project.lng]}
            icon={project.status === "Ongoing" ? customIconOngoing : customIconCompleted}
          >
            <Popup className="custom-popup">
              <div className="w-[200px] overflow-hidden rounded-lg bg-[var(--color-stone-dark)]">
                <div className="h-[120px] relative">
                  <Image src={project.img} alt={project.name} fill sizes="200px" className="object-cover" />
                </div>
                <div className="p-4 text-white">
                  <h4 className="font-serif text-lg mb-1 leading-tight">{project.name}</h4>
                  <div className="flex justify-between items-center text-xs text-white/60 mb-2">
                    <span>{project.sqft} Sq.Ft</span>
                    <span className={`uppercase tracking-widest font-bold ${project.status === "Ongoing" ? "text-[#c9a468]" : "text-white/40"}`}>{project.status}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background-color: var(--color-background);
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          background: var(--color-stone-dark);
          color: white;
          padding: 0;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0;
          width: 200px !important;
        }
        .leaflet-popup-tip {
          background: var(--color-stone-dark);
          border-right: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .leaflet-popup-close-button {
          color: white !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
