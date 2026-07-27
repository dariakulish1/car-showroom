import React, { useState, useEffect } from "react";
import "./FilterVehicle.scss";

const FilterVehicle = ({ vehicleProducts, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(37000);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedReturnPolicies, setSelectedReturnPolicies] = useState([]);

  const handleToggleFilter = () => {
    setIsFilterOpen((open) => !open);
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBrands((current) =>
      checked
        ? [...current, value]
        : current.filter((brand) => brand !== value),
    );
  };

  const handleRatingChange = (event) => {
    const { value, checked } = event.target;
    setSelectedRatings((current) =>
      checked
        ? [...current, value]
        : current.filter((rating) => rating !== value),
    );
  };

  const handleReturnPolicyChange = (event) => {
    const { value, checked } = event.target;
    setSelectedReturnPolicies((current) =>
      checked
        ? [...current, value]
        : current.filter((policy) => policy !== value),
    );
  };

  useEffect(() => {
    const products = vehicleProducts ?? [];
    const hasActiveFilters =
      selectedBrands.length > 0 ||
      selectedRatings.length > 0 ||
      selectedReturnPolicies.length > 0 ||
      maxPrice < 37000;

    if (!hasActiveFilters) {
      onFilterChange?.(null);
      return;
    }

    const filteredProducts = products.filter((product) => {
      const brandMatches =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.toLowerCase());
      const priceMatches = Number(product.price) <= maxPrice;
      const ratingMatches =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => {
          const value = Number(product.rating ?? 0);
          if (rating === "oneTwo") return value >= 1 && value < 2;
          if (rating === "twoThree") return value >= 2 && value < 3;
          if (rating === "threeFour") return value >= 3 && value < 4;
          if (rating === "fourFive") return value >= 4 && value <= 5;
          return true;
        });

      const policyValue = product.returnPolicy?.toLowerCase() === "no return policy" ? "no" : "yes";
      const policyMatches =
        selectedReturnPolicies.length === 0 ||
        selectedReturnPolicies.includes(policyValue);

      return brandMatches && priceMatches && ratingMatches && policyMatches;
    });

    onFilterChange?.(filteredProducts);
  }, [
    maxPrice,
    onFilterChange,
    selectedBrands,
    selectedRatings,
    selectedReturnPolicies,
    vehicleProducts,
  ]);

  return (
    <div className="filter-section">
      <div onClick={handleToggleFilter} className="filter-section__filter-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-list-filter-icon lucide-list-filter"
        >
          <path d="M2 5h20" />
          <path d="M6 12h12" />
          <path d="M9 19h6" />
        </svg>
      </div>
      {isFilterOpen && (
        <div className="filter-section__filter-area">
          <h3 className="filter-section__filter-area-title">Filter by</h3>
          <div>
            <p>Brand:</p>
            <div className="filter-section__brand-input-box">
              <label>
                <input
                  id="chrysler"
                  value="chrysler"
                  type="checkbox"
                  onChange={handleBrandChange}
                />
                Chrysler
              </label>
              <label>
                <input
                  id="dodge"
                  value="dodge"
                  type="checkbox"
                  onChange={handleBrandChange}
                />
                Dodge
              </label>
            </div>
          </div>
          <div>
            <p>Price:</p>
            <div className="filter-section__price-input-and-text">
              <input
                type="range"
                id="cowbell"
                name="cowbell"
                className="filter-section__price-input"
                min="0"
                max="37000"
                step="1000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <p className="filter-section__price-text">{maxPrice}</p>
            </div>
          </div>
          <div>
            <p>Rating:</p>
            <div className="filter-section__rating-input-box">
              <label>
                <input
                  id="one-two"
                  value="oneTwo"
                  type="checkbox"
                  onChange={handleRatingChange}
                />
                1-2
              </label>
              <label>
                <input
                  id="two-three"
                  value="twoThree"
                  type="checkbox"
                  onChange={handleRatingChange}
                />
                2-3
              </label>
              <label>
                <input
                  id="three-four"
                  value="threeFour"
                  type="checkbox"
                  onChange={handleRatingChange}
                />
                3-4
              </label>
              <label>
                <input
                  id="four-five"
                  value="fourFive"
                  type="checkbox"
                  onChange={handleRatingChange}
                />
                4-5
              </label>
            </div>
          </div>
          <div>
            <p>Return Policy:</p>
            <div className="filter-section__return-input-box">
              <label>
                <input
                  id="yes"
                  value="yes"
                  type="checkbox"
                  onChange={handleReturnPolicyChange}
                />
                Yes
              </label>
              <label>
                <input
                  id="no"
                  value="no"
                  type="checkbox"
                  onChange={handleReturnPolicyChange}
                />
                No
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterVehicle;
