import './App.scss';
import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Map />
      <Outlet />
    </div>
  );
}

export default App;
