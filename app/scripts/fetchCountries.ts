import { APICountry, CombinedCountry, ExistingCountry } from '@/app/types/types';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import client from '../lib/apollo-client';
import { GET_COUNTRIES } from '../lib/queries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

async function fetchCountries() {
  try {
    const { data } = await client.query<{ countries: APICountry[] }>({ query: GET_COUNTRIES });
    
    // Combinar los datos de la API con las coordenadas existentes
    const existingData: ExistingCountry[] = JSON.parse(fs.readFileSync(path.join(projectRoot, 'app', 'countries.json'), 'utf-8'));
    const combinedData: CombinedCountry[] = data.countries.map((country: APICountry) => {
      const existingCountry = existingData.find((c: ExistingCountry) => c['ISO Code'] === country.code);
      return {
        ...country,
        'ISO Code': country.code, 
        Latitude: existingCountry ? existingCountry.Latitude : null,
        Longitude: existingCountry ? existingCountry.Longitude : null
      };
    });

    fs.writeFileSync(path.join(projectRoot, 'app', 'countries.json'), JSON.stringify(combinedData, null, 2));
    console.log('Countries data updated successfully');
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

fetchCountries();