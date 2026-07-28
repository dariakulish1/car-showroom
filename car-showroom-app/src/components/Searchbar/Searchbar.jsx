import React, { useEffect, useState } from 'react';
import './Searchbar.scss';
import { useDebouncedCallback } from 'use-debounce';

const Searchbar = ({ vehicleProducts, onFilterChange, setIsLoading }) => {
    const [searchValue, setSearchValue] = useState('');
    const [inputText, setInputText] = useState('');

    const debounced = useDebouncedCallback((value) => {
    setInputText(value);
    setIsLoading(false);
    }, 500);

    const handleInputChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);
    setIsLoading(true);
    debounced(value);
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
            <input className='searchbar__input-text' onChange={handleInputChange} value={searchValue} type='text' placeholder='Search vehicles'/>
        </div>

    );
};



export default Searchbar;

