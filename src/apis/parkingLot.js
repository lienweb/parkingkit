import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 5000,
});

const fetchInfo = async () => {
  try {
    const res = await axiosInstance.get(`${process.env.PUBLIC_URL}/data/info.json`);
    return res.data.data.park;
  } catch (err) {
    if (err.response) {
      // if res code not 200
      // console.log(`${err.response.data}|${err.response.status}|${err.response.headers}`);
    } else {
      // if 404 or no res
      // console.log(`Err:${err.message}`);
    }
  }
  return null;
};

const fetchAvailability = async () => {
  try {
    const res = await axiosInstance.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json');
    return res.data.data.park;
  } catch (err) {
    if (err.response) {
      // if res code not 200
      // console.log(`${err.response.data}|${err.response.status}|${err.response.headers}`);
    } else {
      // if 404 or no res
      // console.log(`Err:${err.message}`);
    }
  }
  return null;
};

const parkingLotApis = {
  fetchInfo,
  fetchAvailability,
};

export default parkingLotApis;
