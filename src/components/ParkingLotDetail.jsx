import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './parkingLotDetail.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ParkingLotDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isClicked, setClicked] = useState(true);
  console.log(state.fareInfo);

  function handleOnClick() {
    setClicked(false);
    navigate(-1);
  }

  return (
    <div
      className="parking-lot-detail"
      style={isClicked ? {
        display: 'block',
        transition: 'display .2s ease-out',
      } : { display: 'none' }}
    >
      <div className="d-flex align-self-end">
        <button type="button" className="image__fixed-width-1 btn-back me-3" onClick={handleOnClick}>
          <span className="material-icons material-symbols-outlined">
            arrow_back
          </span>
        </button>
        <h3 className="m-0">{state.name || '未提供資料'}</h3>
      </div>
      <button type="button" className="image__fixed-width-1 btn-back me-3">
        <span className="material-icons material-symbols-outlined">
          bookmark_add
        </span>
      </button>
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
        </Row>
      </Container>
    </div>
  );
}

export default ParkingLotDetail;
