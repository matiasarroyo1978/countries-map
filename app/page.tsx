import { Providers } from './providers'
import CountriesMap from './components/CountriesMap'

export default function Home() {
  return (
    <Providers>
      <CountriesMap />
    </Providers>
  )
}