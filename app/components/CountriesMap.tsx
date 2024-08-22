'use client'

import { useState, useRef } from 'react'
import { useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import { GET_COUNTRIES } from '../lib/queries'
import Search from './Search'
import { Country, CountriesData } from '../types/types'
import countriesData from '../countries.json'
import Footer from './Footer'

const Map = dynamic(() => import('./Map'), { ssr: false })
export default function Component() {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const mapRef = useRef<any>(null)
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES)

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold">Countries Map</h1>
      </header>
      <main className="flex-grow flex flex-col md:flex-row p-4">
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
          <Search 
            countries={countries} 
            onSearch={handleSearch} 
            onSelectCountry={handleSelectCountry}
          />
        </div>
        <div className="w-full md:w-2/3 h-[60vh] md:h-auto bg-white rounded-lg shadow-md overflow-hidden">
          <Map 
            countries={filteredCountries.length > 0 ? filteredCountries : countries} 
            selectedCountry={selectedCountry}
            ref={mapRef}
          />
        </div>
      </main>
      <Footer/>
    </div>
  )
}