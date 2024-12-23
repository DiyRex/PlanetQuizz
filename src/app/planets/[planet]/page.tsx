"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PlanetDetailsPageProps {
  params: Promise<{ planet: string }>;
}

const PlanetDetailsPage = ({ params }: PlanetDetailsPageProps) => {
  const [planetData, setPlanetData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [planet, setPlanet] = useState<string | null>(null);

  useEffect(() => {
    const fetchParamsAndData = async () => {
      try {
        // Await the params object to get the `planet`
        const { planet } = await params;
        setPlanet(planet);

        // Fetch planet data from the API
        const response = await fetch(`/api/planets/${planet}/details`);
        if (!response.ok) {
          throw new Error("Failed to fetch planet data");
        }
        const data = await response.json();
        setPlanetData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchParamsAndData();
  }, [params]);

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h1>Error: {error}</h1>
        <p>Unable to load planet details. Please try again later.</p>
      </div>
    );
  }

  if (!planetData || !planet) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const {
    name,
    generalInfo,
    sizeAndDistance,
    orbitAndRotation,
    moons,
    surface,
    atmosphere,
    magnetosphere,
  } = planetData;

  return (
    <>
      <Navbar />
      <div className="font-sans p-4 lg:max-w-7xl max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="min-h-[500px] lg:col-span-3 bg-gradient-to-tr from-[#F8C794] via-[#FFE0B5] to-[#FFF2D7] rounded-lg w-full lg:sticky top-0 text-center p-6">
            <Image
              src={`/images/${planet.toLowerCase()}.jpg`}
              alt={name}
              className="w-3/5 rounded object-cover mx-auto py-6"
              width={500} // You can adjust this based on your layout
              height={500} // Maintain the aspect ratio
            />
            <hr className="border-white border my-6" />
            <p className="text-lg font-semibold text-gray-700">{generalInfo.description}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-4xl text-center font-bold text-sky-800 mb-12 mt-12">{name}</h2>

            <section>
              <h3 className="text-xl font-bold text-gray-800">General Information</h3>
              <ul className="list-disc mt-4 pl-4 text-gray-700">
                <li>Namesake: {generalInfo.namesake}</li>
                <li>Age: {generalInfo.age}</li>
              </ul>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Size and Distance</h3>
              <ul className="list-disc mt-4 pl-4 text-gray-700">
                <li>Diameter: {sizeAndDistance.diameter}</li>
                <li>Distance from Sun: {sizeAndDistance.distanceFromSun.value}</li>
              </ul>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Orbit and Rotation</h3>
              <ul className="list-disc mt-4 pl-4 text-gray-700">
                <li>Rotation Period: {orbitAndRotation.rotationPeriod}</li>
                <li>Orbit Period: {orbitAndRotation.orbitPeriod}</li>
              </ul>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Moons</h3>
              <ul className="list-disc mt-4 pl-4 text-gray-700">
                <li>Number of Moons: {moons.number}</li>
                <li>Description: {moons.description}</li>
              </ul>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Surface</h3>
              <p className="mt-4 text-gray-700">{surface.features}</p>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Atmosphere</h3>
              <p className="mt-4 text-gray-700">
                {atmosphere.composition.nitrogen} Nitrogen, {atmosphere.composition.oxygen} Oxygen.
              </p>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Magnetosphere</h3>
              <p className="mt-4 text-gray-700">{magnetosphere.effects}</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlanetDetailsPage;
