import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './parkingLotDetail.scss';
// import illustation from '../assets/parking-lot-detail-page.svg';
// import parkingLotImg from '../assets/parking-lot-example.jpeg';

function ParkingLotDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state.fareInfo);

  return (
    <>
      <Navbar bg="light" expand="md">
        <Container className="align-self-end my-3">
          <div className="d-flex align-self-end">
            <button type="button" className="image__fixed-width-1 btn-back me-3" onClick={() => { navigate(-1); }}>
              <span className="material-icons material-symbols-outlined">
                arrow_back
              </span>
            </button>
            <h3 className="m-0">{state.name}</h3>
          </div>
          <button type="button" className="image__fixed-width-1 btn-back me-3">
            <span className="material-icons material-symbols-outlined">
              bookmark_add
            </span>
          </button>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col md={12}>
            <h3>
              車位資訊：剩餘
              {' '}
              {state.availablecar}
              {' '}
              / 總共
              {' '}
              {state.totalCar}
            </h3>
          </Col>
          <Col md={7} className="d-flex">
            <div className="image__fixed-width-1">
              <span className="material-icons material-symbols-outlined">
                attach_money
              </span>
            </div>
            <h3 className="image__text">{(Object.keys(state.fareInfo).length === 0) ? '無資料' : state.fareInfo.WorkingDay[0].Fare}</h3>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={7} className="d-flex">
            <div className="image__fixed-width-2 me-1">
              <span className="material-icons material-symbols-outlined">
                location_on
              </span>
            </div>
            <h3 className="image__text">
              {state.address}
              <span className="material-icons material-symbols-outlined">
                content_copy
              </span>
            </h3>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={7} className="d-flex">
            <div className="image__fixed-width-1 me-3">
              <span className="material-icons material-symbols-outlined">
                location_city
              </span>
            </div>
            <h3 className="image__text">{state.serviceTime.length ? state.serviceTime : '無資料'}</h3>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={7} className="d-flex">
            <div className="image__fixed-width-1 me-3">
              <span className="material-icons material-symbols-outlined">
                info
              </span>
            </div>
            <h3 className="image__text">{state.payDescription.length ? state.payDescription : '無資料'}</h3>
          </Col>
          <Col md={5}>
            <Link to="/" className="d-flex">
              <div className="image__fixed-width">
                <span className="material-icons material-symbols-outlined">
                  near_me
                </span>
              </div>
              <h3 className="image__text">導航</h3>
            </Link>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={7} className="d-flex">
            <div className="image__fixed-width-1 me-3">
              <span className="material-icons material-symbols-outlined">
                call
              </span>
            </div>
            <h3 className="image__text">{state.tel.length ? state.tel : '無資料'}</h3>
          </Col>
          <Col md={5} className="d-flex">
            <div className="image__fixed-width">
              <span className="material-icons material-symbols-outlined">
                contact_support
              </span>
            </div>
            <h3 className="image__text">我要回報</h3>
          </Col>
          <Col>
            {/* <img src={illustation} alt="illustation" /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ParkingLotDetail;
