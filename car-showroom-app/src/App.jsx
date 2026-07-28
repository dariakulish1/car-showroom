import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/home-page/HomePage";
import VehicleInfoPage from "./pages/vehicle-info-page/VehicleInfoPage";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/vehicle")
      .then((res) => res.json())
      .then((res) => {
        setVehicleData(res);
        setIsLoading(false);
      })
      .catch((err) => console.log("error", err));
  }, []);

  console.log("vehicleData App", vehicleData);

  return (
    <div className="car-showroom">
      <Routes>
        <Route
          path="/"
          element={<HomePage isLoading={isLoading} setIsLoading={setIsLoading} vehicleProducts={vehicleData.products} />}
        />
        <Route
          path="/vehicles/:vehicleId"
          element={<VehicleInfoPage vehicleProducts={vehicleData.products} />}
        />
      </Routes>
    </div>
  );
}

export default App;
