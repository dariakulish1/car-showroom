import React, { useEffect, useState, useCallback } from 'react';
import './Searchbar.scss';

const Searchbar = ({ vehicleProducts, onFilterChange }) => {
    const [inputText, setInputText] = useState('');
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    useEffect(() => {
        const products = vehicleProducts ?? [];
        const query = inputText.trim().toLowerCase();
        if (!query) {
            onFilterChange?.(null);
            return;
        }
        const filtered = products.filter((product) =>
            product.title?.toLowerCase().includes(query)
        );

        onFilterChange?.(filtered);
    }, [inputText, vehicleProducts, onFilterChange]);


    return (
        <div className='searchbar'>
            <div className='searchbar__input-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            </div>
            <input className='searchbar__input-text' onChange={handleInputChange} value={inputText} type='text' placeholder='Search vehicles'/>
        </div>

    );

};



export default Searchbar;

