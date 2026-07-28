import React, { useCallback, useMemo, useState } from "react";
import "./HomePage.scss";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import VehicleCard from "../../components/VehicleCard/VehicleCard.jsx";
import FilterVehicle from "../../components/FilterVehicle/FilterVehicle.jsx";
import { Circles } from "react-loader-spinner";

const HomePage = ({ vehicleProducts, isLoading, setIsLoading }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [filterResults, setFilterResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = useCallback((products) => {
    setSearchResults(products);
  }, []);

  const handleFilterChange = useCallback((products) => {
    setFilterResults(products);
  }, []);

  const vehiclesToShow = useMemo(() => {
    const baseProducts = vehicleProducts ?? [];

    if (searchResults === null && filterResults === null) {
      return baseProducts;
    }

    const sourceProducts = searchResults ?? baseProducts;

    if (filterResults === null) {
      return sourceProducts;
    }

    if (searchResults === null) {
      return filterResults;
    }

    return sourceProducts.filter((product) =>
      filterResults.some(
        (filteredProduct) => filteredProduct.id === product.id,
      ),
    );
  }, [filterResults, searchResults, vehicleProducts]);

  return (
    <div className="home-page">
      <div className="home-page__search-filter-section">
        <h1>CAR SHOWROOM</h1>
        <div className="home-page__search-filter-box">
          <Searchbar
            setIsLoading={setIsLoading}
            vehicleProducts={vehicleProducts}
            onFilterChange={handleSearchChange}
          />
          <FilterVehicle
            vehicleProducts={vehicleProducts}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {isLoading ?
      (
        <div className="loading-circles">
          <Circles
            height="80"
            width="80"
            color="#608df7"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
      )
       : (
        <div className="home-page__vehicle-cards">
          {vehiclesToShow.length === 0 ? (
            <div>No vehicles match the current search or filters</div>
          ) : (
            vehiclesToShow.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicleId={vehicle.id}
                vehicleRating={vehicle.rating}
                vehicleImages={vehicle.images[0]}
                vehicleTitle={vehicle.title}
                vehicleDescription={vehicle.description}
                vehiclePrice={vehicle.price}
              />
            ))
          )}
      </div>
      )}
    </div>
  );
};
export default HomePage;
