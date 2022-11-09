/* eslint-disable react/no-this-in-sfc */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import marker from '../assets/marker-dot.png';
import './map.scss';

function LocateButton({ center }) {
  const map = useMap();
  const [position, setPosition] = useState(null);
  const circleIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [12, 12],
  });

  function handleLocationFound(e) {
    // set & get lat lng
    setPosition(e.latlng);
    map.flyTo(e.latlng, map.getZoom());
    // add marker radius
    const radius = e.accuracy;
    const currentRadius = L.circleMarker(e.latlng, {
      radius,
      color: '#136AEC',
      stroke: false,
      opacity: 0.25,
    });
    currentRadius.addTo(map);
  }
  function handleLocationNotFound() {
    window.alert('無法定位，定位為預設地點');
    map.flyTo(center);
  }
  function handleOnFindLocation() {
    map.locate({
      setView: false,
      watch: true,
      maxZoom: 18,
      enableHighAccuracy: true,
      timeout: 10000,
    }).on('locationfound', handleLocationFound);
  }

  useEffect(() => {
    // create button
    if (!map) return undefined;
    const buttonControl = L.control({
      position: 'bottomright',
    });

    buttonControl.onAdd = function () {
      this.div = L.DomUtil.create('button', 'btn-wrapper');
      const buttonElement = '<i class="material-icons material-symbols-outlined">my_location</i>';
      this.div.innerHTML = buttonElement;
      this.div.addEventListener('click', handleOnFindLocation);
      return this.div;
    };
    buttonControl.addTo(map);

    return () => {
      map.on('locationerror', handleLocationNotFound);
      buttonControl.remove();
    };
  }, []);

  return position === null ? null
    : (
      <Marker position={position} icon={circleIcon}>
        <Popup>
          You are here:
          {' '}
          {position.toString().slice(7, -1)}
          <br />
        </Popup>
      </Marker>
    );
}

LocateButton.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

LocateButton.defaultProps = {
  center: { lat: 25.026312001265776, lng: 121.5435894427204 },
};

export default LocateButton;
