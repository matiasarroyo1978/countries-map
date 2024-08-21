'use client'
import { useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import { GET_COUNTRIES } from '../lib/queries'
import Search from './Search'

// Importar el componente Map de forma dinámica para evitar problemas con SSR y Leaflet
const Map = dynamic(() => import('./Map'), { ssr: false })

// Definir la interfaz Country
interface Country {
  name: string
  code: string
  latitude: number
  longitude: number
}

// Definir la estructura de datos que devuelve la consulta GraphQL
interface CountriesData {
  countries: Array<{
    name: string
    code: string
  }>
}

// Importar datos de countries.json
import countriesData from '../countries.json'

export default function CountriesMap() {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const mapRef = useRef<any>(null)
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES)

  // Combinar los datos de GraphQL con los datos de countries.json
  const countries: Country[] = data?.countries.map(country => {
    const countryData = countriesData.find(c => c['ISO Code'] === country.code)
    return {
      name: country.name,
      code: country.code,
      latitude: countryData ? countryData.Latitude : 0,
      longitude: countryData ? countryData.Longitude : 0
    }
  }) || []

  const handleSearch = (filtered: Country[]) => {
    setFilteredCountries(filtered)
  }

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country)
    if (mapRef.current && mapRef.current.setView) {
      mapRef.current.setView([country.latitude, country.longitude], 5)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white p-4 flex justify-center items-center">
       <h1 className="text-2xl font-bold">Countries Map</h1>
      </header>
      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 search-container">
          <Search 
            countries={countries} 
            onSearch={handleSearch} 
            onSelectCountry={handleSelectCountry}
          />
        </div>
        <div className="w-full md:w-2/3 h-64 md:h-auto map-container">
          <Map 
            countries={filteredCountries.length > 0 ? filteredCountries : countries} 
            selectedCountry={selectedCountry}
            ref={mapRef}
          />
        </div>
      </main>
    </div>
  )
}