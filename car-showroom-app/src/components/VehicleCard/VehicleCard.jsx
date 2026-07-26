import React from 'react';
import './VehicleCard.scss';

const VehicleCard = ({ vehicleId, vehicleRating, vehicleImages, vehicleTitle, vehicleDescription, vehiclePrice }) => {
    return (
        <div className='vehicle-box' key={vehicleId}>
            <div style={{background: vehicleRating > 4 ? "#4FB056" : vehicleRating > 3 ? "#D9C334" : "#CF1600"}} className='vehicle-box__card-rating'>{vehicleRating}</div>
            <img className='vehicle-box__card-image' src={vehicleImages} alt={vehicleTitle} />
            <div className='vehicle-box__card-content'>
                <h2 className='vehicle-box__card-title'>{vehicleTitle}</h2>
                <p className='vehicle-box__card-description'>{vehicleDescription}</p>
                <p>{vehiclePrice}</p>
            </div>
        </div>
    )
}

export default VehicleCard;