import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { firstNationsBoundaries } from '../data/firstNationsBoundaries';
import { healthServices } from '../data/healthServices';
import type { HealthService } from '../data/healthServices';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  onServiceClick: (service: HealthService) => void;
  onTerritoryClick: (territoryId: string) => void;
}

interface LocationState {
  userLocation: [number, number] | null;
  locationError: string | null;
  isLocating: boolean;
}

interface SearchState {
  searchQuery: string;
  isSearching: boolean;
  searchError: string | null;
}

// Component to handle map centering when user location is found
const LocationMarker: React.FC<{ position: [number, number] | null }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

const MapComponent: React.FC<MapComponentProps> = ({ onServiceClick, onTerritoryClick }) => {
  const [location, setLocation] = useState<LocationState>({
    userLocation: null,
    locationError: null,
    isLocating: false
  });

  const [search, setSearch] = useState<SearchState>({
    searchQuery: '',
    isSearching: false,
    searchError: null
  });

  // Cairns coordinates as default center
  const cairnsCenter: [number, number] = [-16.9186, 145.7781];

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        locationError: 'Geolocation is not supported by this browser.'
      }));
      return;
    }

    setLocation(prev => ({ ...prev, isLocating: true, locationError: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setLocation({
          userLocation: userPos,
          locationError: null,
          isLocating: false
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocation({
          userLocation: null,
          locationError: errorMessage,
          isLocating: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const searchAddress = async () => {
    if (!search.searchQuery.trim()) return;

    setSearch(prev => ({ ...prev, isSearching: true, searchError: null }));

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search.searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setLocation(prev => ({
          ...prev,
          userLocation: [lat, lon]
        }));
      } else {
        setSearch(prev => ({
          ...prev,
          searchError: 'Address not found'
        }));
      }
    } catch (error) {
      setSearch(prev => ({
        ...prev,
        searchError: 'Search failed. Please try again.'
      }));
    } finally {
      setSearch(prev => ({ ...prev, isSearching: false }));
    }
  };

  // Style for First Nations boundaries
  const boundaryStyle = {
    fillColor: '#ff7800',
    weight: 2,
    opacity: 1,
    color: '#ff7800',
    dashArray: '3',
    fillOpacity: 0.2
  };

  // Handle territory click
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        onTerritoryClick(feature.properties.id);
      }
    });

    // Add popup with territory info
    layer.bindPopup(`
      <div>
        <h3>${feature.properties.name}</h3>
        <p>${feature.properties.description}</p>
        ${feature.properties.language ? `<p><strong>Language:</strong> ${feature.properties.language}</p>` : ''}
        <p><em>Click to view health services in this area</em></p>
      </div>
    `);
  };

  // Create custom icons for different service types
  const getServiceIcon = (serviceType: string) => {
    const iconColor = serviceType === 'traditional' ? '#8B4513' :
                     serviceType === 'community' ? '#228B22' : '#DC143C';

    return L.divIcon({
      html: `<div style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <div className="map-container">
      <div className="map-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter address..."
            value={search.searchQuery}
            onChange={(e) => setSearch(prev => ({ ...prev, searchQuery: e.target.value }))}
            onKeyPress={(e) => e.key === 'Enter' && searchAddress()}
            className="search-input"
          />
          <button
            onClick={searchAddress}
            disabled={search.isSearching || !search.searchQuery.trim()}
            className="search-btn"
          >
            {search.isSearching ? '...' : '🔍'}
          </button>
        </div>
        {search.searchError && (
          <div className="location-error">{search.searchError}</div>
        )}
        <button
          onClick={requestLocation}
          disabled={location.isLocating}
          className="location-btn"
        >
          {location.isLocating ? 'Locating...' : 'Locate Me'}
        </button>
        {location.locationError && (
          <div className="location-error">{location.locationError}</div>
        )}
      </div>

      <MapContainer
        center={cairnsCenter}
        zoom={10}
        style={{ height: '70vh', width: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* First Nations boundaries */}
        <GeoJSON
          data={firstNationsBoundaries}
          style={boundaryStyle}
          onEachFeature={onEachFeature}
        />

        {/* Health services markers */}
        {healthServices.map((service) => (
          <Marker
            key={service.id}
            position={[service.coordinates[1], service.coordinates[0]]}
            icon={getServiceIcon(service.type)}
            eventHandlers={{
              click: () => onServiceClick(service)
            }}
          >
            <Popup>
              <div>
                <h4>{service.name}</h4>
                <p><strong>Type:</strong> {service.type}</p>
                <p>{service.description}</p>
                <p><strong>Address:</strong> {service.address}</p>
                {service.phone && <p><strong>Phone:</strong> {service.phone}</p>}
                <p><em>Click marker for more details</em></p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        <LocationMarker position={location.userLocation} />
      </MapContainer>

      <div className="map-legend">
        <h4>Legend</h4>
        <div className="legend-item">
          <div className="legend-marker traditional"></div>
          <span>Traditional Healing</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker community"></div>
          <span>Community Health</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker western"></div>
          <span>Western Medicine</span>
        </div>
        <div className="legend-item">
          <div className="legend-boundary"></div>
          <span>First Nations Boundaries</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
