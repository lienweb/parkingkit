import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import marker from '../assets/marker-dot.svg';
import './Map.scss';

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
  }
  function handleLocationNotFound() {
    // eslint-disable-next-line no-alert
    window.alert('無法定位，定位為預設地點');
    map.flyTo(center, map.getZoom());
    map.setView(center, 18); // locate to default
    setPosition(center);
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
      const buttonElement = '<i class="material-icons material-symbols-outlined" data-testid="locate-me">my_location</i>';
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
          當前位置
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
