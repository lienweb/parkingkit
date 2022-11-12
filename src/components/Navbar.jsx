import './Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

function NavBar() {
  const [show, setShow] = useState(false);
  const handleClick = () => { setShow(!show); };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light nav__container">
      <div className="container-fluid nav__container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
          <span className="navbar-toggler-icon" />
        </button>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="image__fluid" />
        </Link>
        <div className={show ? 'mx-3 collapse navbar-collapse show' : 'collapse navbar-collapse mx-3'} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">服務介紹</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">聯絡我們</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
