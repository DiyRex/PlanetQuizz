"use client";

import React from "react";

interface PlanetCardProps {
  image: string;
  name: string;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ image, name }) => {
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="min-h-[245px]">
        <img src={image} alt={name} className="w-full rounded-lg" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold">{name}</h3>
        <button
          type="button"
          className="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default PlanetCard;
