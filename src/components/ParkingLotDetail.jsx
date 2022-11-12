import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ParkingLotDetail.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ParkingLotDetail() {
  const { state } = useLocation();
  const [isClicked, setClicked] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleOnClick() {
    setClicked(false);
  }

  return (
    <div
      className="parking-lot-detail"
      style={isClicked ? {
        display: 'block',
      } : { display: 'none' }}
    >
      <div className="parking-detail__container d-flex align-self-end px-4 py-4">
        <Link to="/">
          <button type="button" className="btn-back me-3" onClick={handleOnClick}>
            <span className="material-icons material-symbols-outlined">
              arrow_back
            </span>
          </button>
        </Link>
        <h3 className="m-0">{state.name || '未提供資料'}</h3>
      </div>
      <Container>
        <Row className="btn__group d-flex justify-content-evenly px-3 py-1">
          <Col className="d-flex align-items-center flex-column">
            <Button variant="primary" className="d-flex align-items-center flex-column" onClick={handleShow}>
              <span className="material-icons material-symbols-outlined md-24 text-white">
                contact_support
              </span>
              <h5 className="mt-1">我要回報</h5>
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>ParkingKit</Modal.Header>
              <Modal.Body className="text-center">已成功回報</Modal.Body>
            </Modal>
          </Col>
          <Col>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${state.name}`} className="d-flex align-items-center text__nav-link flex-column btn btn-primary">
              <span className="material-icons material-symbols-outlined md-24 text-white">
                near_me
              </span>
              <h5 className="mt-1 text-white">導航</h5>
            </a>
          </Col>
        </Row>
        <Row className="px-5 py-4">
          <Col md={12} className="d-flex align-items-center">
            <span className="material-icons material-symbols-outlined md-36 me-2">
              directions_car
            </span>
            <h4 className="mt-1">
              {'  '}
              剩餘
              {' '}
              {state.availablecar < 0 ? 0 : state.availablecar}
              {' '}
              / 總共
              {' '}
              {state.totalCar < 0 ? 0 : state.totalCar}
            </h4>
          </Col>
          <Col md={12} className="d-flex align-items-center">
            <span className="material-icons material-symbols-outlined md-36 me-2">
              two_wheeler
            </span>
            <h4 className="mt-1">
              剩餘
              {' '}
              {state.availablemotor < 0 ? 0 : state.availablemotor}
              {' '}
              / 總共
              {' '}
              {state.totalMotor < 0 ? 0 : state.totalMotor}
            </h4>
          </Col>
          <Col md={7} className="d-flex align-items-center">
            <span className="material-icons material-symbols-outlined md-36 me-2">
              attach_money
            </span>
            <h4 className="mt-1">{(Object.keys(state.fareInfo).length === 0) ? '無資料' : state.fareInfo.WorkingDay[0].Fare}</h4>
          </Col>
          <Col md={12} className="d-flex align-items-center">
            <span className="material-icons material-symbols-outlined md-36 me-1">
              location_on
            </span>
            <h4 className="mt-1">
              {state.address}
              {/* <span className="material-icons material-symbols-outlined ms-2">
                content_copy
              </span> */}
            </h4>
          </Col>
          <Col md={12} className="d-flex align-items-start mt-2">
            <span className="material-icons material-symbols-outlined md-36 me-2 mt-1">
              location_city
            </span>
            <h4 className="mt-1">{state.serviceTime.length ? state.serviceTime : '無資料'}</h4>
          </Col>
          <Col md={12} className="d-flex align-items-start mt-2">
            <span className="material-icons material-symbols-outlined md-36 me-2 mt-1">
              info
            </span>
            <h4 className="mt-1">{state.payDescription.length ? state.payDescription : '無資料'}</h4>
          </Col>
          <Col md={12} className="d-flex align-items-center mt-2">
            <span className="material-icons material-symbols-outlined md-36 me-2">
              call
            </span>
            <h4 className="mt-1">{state.tel.length ? state.tel : '無資料'}</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ParkingLotDetail;
