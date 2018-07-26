import React from 'react';
import image from '../images/house-location-pin.svg';
import Filter from './Filter';
import PropTypes from 'prop-types';

const Header = ({filterIsVisible, toggleFilter, handleFilterChange, clearFilter}) => {
    return (
        <header className={`${filterIsVisible ? 'filter-is-visible' : ''}`}>
            <Filter
                clearFilter={clearFilter}
                toggleFilter={toggleFilter}
                handleFilterChange={handleFilterChange}/>
            <img src={image}/>
            <h1>Property Listings</h1>
            <button className="btn-filter" onClick={(e) => toggleFilter(e)}>Filter</button>
        </header>
    )
};

Header.propTypes = {
    filterIsVisible: PropTypes.bool.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired
};

export default Header;