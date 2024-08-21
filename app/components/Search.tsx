'use client'

import { useState, useEffect } from 'react'
import { Country, SearchProps } from '../types/types';
export default function Search({ countries, onSearch, onSelectCountry }: SearchProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Country[]>([])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = countries.filter(country => 
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.code.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
      onSearch(filtered)
    } else {
      setSuggestions([])
      onSearch(countries)
    }
  }, [query, countries, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSelectCountry = (country: Country) => {
    setQuery(country.name)
    setSuggestions([])
    onSelectCountry(country)
  }

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
          {suggestions.map(country => (
            <li 
              key={country.code}
              onClick={() => handleSelectCountry(country)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {country.name} ({country.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
