import React, { useCallback, useState } from 'react';
import './HomePage.scss';
import Searchbar from '../../components/Searchbar/Searchbar.jsx';
import VehicleCard from '../../components/VehicleCard/VehicleCard.jsx';
import FilterVehicle from '../../components/FilterVehicle/FilterVehicle.jsx';

const HomePage = ({ vehicleProducts }) => {
    const [filteredProducts, setFilteredProducts] = useState(null);
    const handleFilterChange = useCallback((products) => {
        setFilteredProducts(products);
    }, []);

    const vehiclesToShow =
        filteredProducts !== null ? filteredProducts : vehicleProducts ?? [];

    return (
        <div className='home-page'>
            <h1>Home Page</h1>
            <div className='home-page__search-filter-box'>
                <Searchbar
                    vehicleProducts={vehicleProducts}
                    onFilterChange={handleFilterChange}
                />
                <FilterVehicle />
            </div>
            <div className='home-page__vehicle-cards'>
            {filteredProducts !== null && vehiclesToShow.length === 0 ? (
                <div>No vehicle with this title found</div>
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
        </div>
    );
};
export default HomePage;