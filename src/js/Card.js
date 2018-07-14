import React from 'react';
import PropType from 'prop-types';

const Card = ({property, activeProperty}) => {
    const {price, address, picture, city, bedrooms, bathrooms, carSpaces} = property;
    const activeClass = property === activeProperty ? 'is-active': '';
    return <div id="card-0" className={`card col-sm-12 col-md-6 col-lg-4 ${activeClass}`}>
        <img src={picture} alt="Singer" />
        <p className="price">{price}</p>
        <div className="details">
            <span className="index">1</span>
            <p className="location">
                {city}<br />{address}
            </p>
            <ul className="features">
                <li className="icon-bed">{bedrooms}<span>bedrooms</span></li>
                <li className="icon-bath">{bathrooms}<span>bathrooms</span></li>
                <li className="icon-car">{carSpaces}<span>parking spots</span></li>
            </ul>
        </div>
    </div>
};



Card.propTypes = {
    property: PropType.object.isRequired,
    activeProperty: PropType.object.isRequired
};

export default Card;