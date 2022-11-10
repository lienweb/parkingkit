import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';
import marker from '../assets/marker.svg';

function SearchButton({ position }) {
  const map = useMap();
  const provider = new OpenStreetMapProvider();
  const icon = new L.Icon({
    iconUrl: marker,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -46],
  });
  const searchControl = new GeoSearchControl({
    provider,
    position,
    style: 'button',
    searchLabel: '請輸入地址',
    notFoundMessage: '找不到此地址',
    autoComplete: true,
    autoCompleteDelay: 150,
    marker: {
      icon,
    },
  });

  useEffect(() => {
    if (!map) return undefined;
    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, []);
}

export default SearchButton;
