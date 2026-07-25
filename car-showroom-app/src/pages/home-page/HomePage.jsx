import React from 'react';
import './HomePage.scss';
import Searchbar from '../../components/Searchbar/Searchbar.jsx';

const HomePage = ({ vehicleData }) => {
    console.log("vehicleData HomePage", vehicleData);
    return (
        <div className='home-page'>
            <h1>Home Page</h1>
            <Searchbar />
            <div className='home-page__vehicle-container'>
                {vehicleData?.map((vehicle) => (
                    <div className='home-page__vehicle-card' key={vehicle.id}>
                        <div style={{background: vehicle.rating > 4 ? "#4FB056" : vehicle.rating > 3 ? "#D9C334" : "#CF1600"}} className='home-page__card-rating'>{vehicle.rating}</div>
                        <img className='home-page__card-image' src={vehicle.images[0]} alt={vehicle.title} />
                        <div className='home-page__card-content'>
                            <h2 className='home-page__card-title'>{vehicle.title}</h2>
                            <p className='home-page__card-description'>{vehicle.description}</p>
                            <p>{vehicle.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HomePage;