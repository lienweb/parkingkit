import 'leaflet/dist/leaflet.css';
import './map.scss';
import L from 'leaflet';
import {
  MapContainer, TileLayer, ZoomControl, Marker, Popup,
} from 'react-leaflet';
import marker from '../assets/marker.png';
import LocateButton from './LocateButton';
import SearchButton from './SearchButton';
import ParkingMarkers from './ParkingMarkers';

function Map() {
  const center = { lat: 25.026312001265776, lng: 121.5435894427204 };
  const zoomLevel = 15;
  const markerIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [24, 36],
    iconAnchor: [12, 36], // align when zoom in out
    popupAnchor: [0, -46],
  });

  return (
    <div className="map__container">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoomLevel}
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www. openstreetmap.org/copyright">OpenStreetMap Contributors</ a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <SearchButton position="topleft" />
        <LocateButton center={center} />
        <Marker position={[center.lat, center.lng]} icon={markerIcon}>
          <Popup>
            <b>當前位置</b>
          </Popup>
        </Marker>
        <ParkingMarkers />
      </MapContainer>
    </div>
  );
}

export default Map;
