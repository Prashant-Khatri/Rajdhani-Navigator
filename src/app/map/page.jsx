"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function MapPage() {
  const [zoom, setZoom] = useState(1);

  const increaseZoom = () => setZoom(prev => Math.min(prev + 0.2, 2.2));
  const decreaseZoom = () => setZoom(prev => Math.max(prev - 0.2, 0.6));
  const resetZoom = () => setZoom(1);

  return (
    <main className="min-h-screen fade-slide-in p-4">

      <Navbar/>

      <div className="max-w-6xl mx-auto mt-6 bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-4 md:p-6">

        <h2 className="text-center text-xl md:text-3xl font-bold mb-4">
          Delhi Metro Map
        </h2>

        {/* Zoom Controls */}
        <div className="flex justify-center gap-3 mb-4">
          <button onClick={decreaseZoom} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">➖</button>
          <button onClick={resetZoom} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Reset</button>
          <button onClick={increaseZoom} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">➕</button>
        </div>

        <div className="overflow-hidden relative border rounded-xl shadow-md bg-white">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease",
            }}
            className="w-full flex justify-center"
          >
            <Image
              src="/metro-map.svg"
              alt="Delhi Metro Map"
              width={1600}
              height={1000}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
