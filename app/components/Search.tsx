"use client";

import { SearchProps } from "../types/types";
import { useState, useEffect } from "react";

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full p-2 border border-input rounded bg-background text-foreground"
  />
);

export default function Search({
  countries,
  onSearch,
}: SearchProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (Array.isArray(countries)) {
      const filtered = countries.filter(
        (country) =>
          (country.name?.toLowerCase().includes(query.toLowerCase()) ??
            false) ||
          (country.code?.toLowerCase().includes(query.toLowerCase()) ??
            false) ||
          (country.continent?.toLowerCase().includes(query.toLowerCase()) ??
            false) ||
          (country.capital?.toLowerCase().includes(query.toLowerCase()) ??
            false)
      );
      onSearch(filtered);
    } else {
      onSearch([]);
    }
  }, [query, countries, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country, or capital"
      />
    </div>
  );
}
