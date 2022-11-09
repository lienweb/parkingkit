import { useState, useEffect } from 'react';
// import "leaflet.markercluster/dist/MarkerCluster.css";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import proj4 from 'proj4';
import MarkerClusterGroup from './MarkerClusterGroup';
import parkingLotApis from '../apis/parkingLot';
import ParkingMarker from './ParkingMarker';

// pass api info into marker
function ParkingMarkers() {
  const [coordinates, setCoordinates] = useState([]);
  const [availability, setAvailability] = useState([]);
  proj4.defs([
    ['EPSG:3826', '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'],
    ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs +type=crs'],
  ]);

  // get data from api
  useEffect(() => {
    async function callMultipleApis() {
      const promises = [
        parkingLotApis.fetchInfo(),
        parkingLotApis.fetchAvailability(),
      ];

      Promise.allSettled(promises).then((values) => {
        console.log(`${values[0].status}|${values[1].status}`);
        setCoordinates(values[0].value);
        setAvailability(values[1].value);
      });
    }
    callMultipleApis();
  }, []);

  console.log(`info:${coordinates.length}`);
  console.log(`avail:${availability.length}`);

  // get coordinates
  const coordArr = coordinates.map((coordinate) => {
    // convert coordinates
    const { tw97x, tw97y } = coordinate;
    const [lng, lat] = proj4('EPSG:3826', 'EPSG:4326', [parseFloat(tw97x), parseFloat(tw97y)]);

    return {
      id: coordinate.id,
      name: coordinate.name,
      address: `台北市${coordinate.area}${coordinate.address}`,
      tel: coordinate.tel,
      payDescription: coordinate.payex,
      fareInfo: coordinate.FareInfo,
      serviceTime: coordinate.serviceTime,
      totalCar: coordinate.totalcar,
      totalMotor: coordinate.totalmotor,
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
    };
  });

  // data process
  const infoArray = coordArr.map((coord) => {
    let avail = availability.find((item) => item.id === coord.id);

    if (avail === undefined) {
      avail = {
        id: coord.id,
        availablebus: 0,
        availablecar: 0,
        availablemotor: 0,
      };
    }

    return {
      id: coord.id,
      position: { lat: coord.lat, lng: coord.lng },
      description: {
        ...coord,
        ...avail,
      },
    };
  });

  // console.log(infoArray);

  return (
    <MarkerClusterGroup>
      {
        infoArray.map((info) => (
          <ParkingMarker
            key={info.id}
            position={info.position}
            description={info.description}
          />
        ))
      }
    </MarkerClusterGroup>
  );
}

export default ParkingMarkers;
