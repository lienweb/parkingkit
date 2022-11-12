import { useState, useEffect, useRef } from 'react';
import proj4 from 'proj4';
import MarkerClusterGroup from './MarkerClusterGroup';
import parkingLotApis from '../apis/parkingLot';
import ParkingMarker from './ParkingMarker';

function convertCoordinate(tw97x, tw97y) {
  proj4.defs([
    ['EPSG:3826', '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'],
    ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs +type=crs'],
  ]);
  const [lng, lat] = proj4('EPSG:3826', 'EPSG:4326', [parseFloat(tw97x), parseFloat(tw97y)]);
  return [lat, lng];
}

function isCoordValid(lat, lng) {
  return (lng > 120 && lng < 123
    && lat < 26 && lat > 21);
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function execute() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(execute, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}

// pass api info into marker
function ParkingMarkers() {
  const [coordinates, setCoordinates] = useState([]);
  const [availability, setAvailability] = useState([]);

  // get data from api when component mounted
  useEffect(() => {
    async function callMultipleApis() {
      const promises = [
        parkingLotApis.fetchInfo(),
        parkingLotApis.fetchAvailability(),
      ];

      Promise.allSettled(promises).then((values) => {
        setCoordinates(values[0].value);
        setAvailability(values[1].value);
      });
    }
    callMultipleApis();
  }, []);

  useInterval(() => {
    const newAvail = parkingLotApis.fetchAvailability();
    newAvail.then((res) => {
      setAvailability(res);
    }).catch((err) => console.log(`skip update:${err}`));
  }, 120000);

  // get coordinates
  const coordArr = coordinates.filter((coordinate) => {
    // convert coordinates
    const { tw97x: tw97xTest, tw97y: tw97yTest } = coordinate;
    const [lat, lng] = convertCoordinate(tw97xTest, tw97yTest);

    return isCoordValid(lat, lng);
  }).map((coordinate) => {
    const { tw97x, tw97y } = coordinate;
    const [lat, lng] = convertCoordinate(tw97x, tw97y);

    return {
      id: coordinate.id,
      name: coordinate.name.length ? coordinate.name : '無資料',
      address: coordinate.address.length ? `台北市${coordinate.area}${coordinate.address}` : '未提供地址',
      tel: coordinate.tel.length ? coordinate.tel : '無資料',
      payDescription: coordinate.payex.length ? coordinate.payex : '無相關資訊',
      fareInfo: coordinate.FareInfo,
      serviceTime: coordinate.serviceTime.length ? coordinate.serviceTime : '無相關資訊',
      totalCar: coordinate.totalcar ? coordinate.totalcar : 0,
      totalMotor: coordinate.totalmotor ? coordinate.totalmotor : 0,
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
