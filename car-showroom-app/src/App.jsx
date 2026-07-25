import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home-page/HomePage';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/vehicle')
      .then(res => res.json())
      .then(res => setVehicleData(res))
      .catch(err => console.log("error", err));
  }, []);

  console.log("vehicleData App", vehicleData);

  return (
    <div className="car-showroom">
      <Routes>
        <Route path="/" element={<HomePage vehicleData={vehicleData.products} />} />
      </Routes>
    </div>
  );
}

export default App;
