import { Link } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Container, Badge } from 'react-bootstrap';
import marker from '../assets/marker.svg';

function ParkingMarker({ position, description }) {
  const markerIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -46],
  });
  // console.log(description);

  return (
    <Marker position={[parseFloat(position.lat), position.lng]} icon={markerIcon}>
      <Popup>
        <Container fluid className="popup__container">
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              剩餘:
              {(description.availablecar < 0) ? '無資料' : description.availablecar}
              /總共:
              {description.totalCar ? description.totalCar : 'N/A'}

            </h5>
            <Badge bg="secondary">營業中</Badge>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6>{description.name}</h6>
              <h6>{(Object.keys(description.fareInfo).length === 0) ? '$ N/A' : `$ ${description.fareInfo.WorkingDay[0].Fare}`}</h6>
            </div>
            <Link
              to={`/parking-lot/${description.id}`}
              className="btn btn-secondary text-white"
              state={description}
            >
              詳細資訊
            </Link>
          </div>
        </Container>
      </Popup>
    </Marker>
  );
}

ParkingMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
  }),
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    payDescription: PropTypes.string.isRequired,
    fareInfo: PropTypes.object.isRequired,
    serviceTime: PropTypes.string.isRequired,
    totalCar: PropTypes.number.isRequired,
    availablecar: PropTypes.number.isRequired,
    availablemotor: PropTypes.number.isRequired,
    totalMotor: PropTypes.number.isRequired,
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
  }),
};

export default ParkingMarker;
