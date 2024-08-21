export interface Country {
    name: string;
    code: string;
    latitude: number;
    longitude: number;
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
    }>;
  }