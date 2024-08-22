"use client";

import countriesData from "../countries.json";
import { GET_COUNTRIES } from "../lib/queries";
import { Country, CountriesData } from "../types/types";
import Footer from "./Footer";
import Search from "./Search";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Home() {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const mapRef = useRef<any>(null);
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);

  const countries: Country[] =
    data?.countries.map((country) => {
      const countryData = countriesData.find(
        (c) => c["ISO Code"] === country.code
      );
      return {
        name: country.name,
        code: country.code,
        capital: country.capital,
        currency: country.currency,
        languages: country.languages.map((lang) => lang.name),
        continent: country.continent.name,
        latitude: countryData ? countryData.Latitude : 0,
        longitude: countryData ? countryData.Longitude : 0,
      };
    }) || [];

  const handleSearch = (filtered: Country[]) => {
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    if (mapRef.current && mapRef.current.setView) {
      mapRef.current.setView([country.latitude, country.longitude], 5);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      const countryElement = document.getElementById(
        `country-${selectedCountry.code}`
      );
      if (countryElement) {
        countryElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedCountry]);

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-gray-500 text-primary-foreground p-4 flex justify-center items-center">
        <h1 className="text-2xl text-white font-bold">Countries Map</h1>
      </header>
      <main className="flex-grow flex flex-col md:flex-row p-4">
        <div className="w-full md:w-1/3 p-4 bg-slate-50 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <Search
            countries={countries}
            onSearch={handleSearch}
            onSelectCountry={handleSelectCountry}
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Countries</h2>
            <ul className="space-y-2">
              {(filteredCountries.length > 0
                ? filteredCountries
                : countries
              ).map((country) => (
                <li
                  key={country.code}
                  id={`country-${country.code}`}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-300 ${
                    selectedCountry?.code === country.code ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleSelectCountry(country)}
                >
                  <h3 className="font-semibold">{country.name}</h3>
                  <p className="text-sm">Capital: {country.capital}</p>
                  <p className="text-sm">Currency: {country.currency}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-2/3 h-[60vh] md:h-auto bg-gray-200 rounded-lg shadow-md overflow-hidden">
          <Map
            countries={
              filteredCountries.length > 0 ? filteredCountries : countries
            }
            selectedCountry={selectedCountry}
            ref={mapRef}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
