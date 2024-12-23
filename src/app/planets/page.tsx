

import React from "react";
import PlanetCard from "@/components/planet-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useParams } from "next/navigation";

const planets = [
  { name: "Mercury", image: "/images/mercury.jpg" },
  { name: "Venus", image: "/images/venus.jpg" },
  { name: "Earth", image: "/images/earth.jpg" },
  { name: "Mars", image: "/images/mars.jpg" },
  { name: "Jupiter", image: "/images/jupiter.jpg" },
  { name: "Saturn", image: "/images/saturn.jpg" },
  { name: "Uranus", image: "/images/uranus.jpg" },
  { name: "Neptune", image: "/images/neptune.jpg" },
];

const PlanetsPage = () => {


  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Explore the Planets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {planets.map((planet) => (
            <a href={`/planets/${planet.name.toLowerCase()}`} key={planet.name}>
                <PlanetCard
                  key={planet.name}
                  image={planet.image}
                  name={planet.name}
                />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlanetsPage;
