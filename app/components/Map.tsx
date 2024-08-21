'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { forwardRef, useEffect, useImperativeHandle, Ref } from 'react'
import { Country, MapProps} from '../types/types';

function MapController({ selectedCountry }: { selectedCountry: Country | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedCountry) {
      map.setView([selectedCountry.latitude, selectedCountry.longitude], 5)
    }
  }, [selectedCountry, map])

  return null
}

const Map = forwardRef<any, MapProps>(({ countries, selectedCountry }, ref: Ref<any>) => {
  // Create a custom icon for the markers using Leaflet's default icon from the CDN
  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41]
  })

  useImperativeHandle(ref, () => ({
    setView: (center: [number, number], zoom: number) => {
      const map = (ref as React.MutableRefObject<any>).current
      if (map && map.setView) {
        map.setView(center, zoom)
      }
    }
  }))

  return (
    <MapContainer center={[0, 0]} zoom={2} minZoom={2} style={{ height: '100%', width: '100%' }} ref={ref}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country) => (
        <Marker 
          key={country.code} 
          position={[country.latitude, country.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{country.name}</h3>
              <p>Code: {country.code}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapController selectedCountry={selectedCountry} />
    </MapContainer>
  )
})

Map.displayName = 'Map'

export default Map