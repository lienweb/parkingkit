import 'leaflet/dist/leaflet.css';
import './map.scss';
import {
  MapContainer, TileLayer, ZoomControl,
} from 'react-leaflet';
// import NavBar from './Navbar';
import LocateButton from './LocateButton';
import SearchButton from './SearchButton';
import ParkingMarkers from './ParkingMarkers';

function Map() {
  const center = { lat: 25.026312001265776, lng: 121.5435894427204 };
  const zoomLevel = 15;

  return (
    <div className="map__container">
      {/* <NavBar /> */}
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
        <LocateButton center={center} />
        <SearchButton position="bottomright" />
        <ParkingMarkers />
      </MapContainer>
    </div>
  );
}

export default Map;
