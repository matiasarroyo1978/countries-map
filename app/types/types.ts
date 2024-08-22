export interface Country {
  name: string;
  code: string;
  capital: string;
  currency: string;
  languages: string[];
  continent: string;
  latitude: number | null;
  longitude: number | null;
}

export interface SearchProps {
  countries: Country[];
  onSearch: (filteredCountries: Country[]) => void;
  onSelectCountry: (country: Country) => void;
}

export interface MapProps {
  countries: Country[];
  selectedCountry: Country | null;
}

export interface CountriesData {
  countries: Array<{
    name: string;
    code: string;
    capital: string;
    currency: string;
    languages: Array<{ name: string }>;
    continent: { name: string };
  }>;
}
interface Language {
  name: string;
}

interface Continent {
  name: string;
}

export interface APICountry {
  name: string;
  code: string;
  capital: string;
  currency: string;
  languages: Language[];
  continent: Continent;
}

export interface ExistingCountry {
  Country: string;
  'ISO Code': string;
  Latitude: number;
  Longitude: number;
}

export interface CombinedCountry extends APICountry {
  'ISO Code': string;
  Latitude: number | null;
  Longitude: number | null;
}