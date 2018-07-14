import React from 'react';
import PropType from 'prop-types';
import {priceFormat} from './utils/Formatters';

const Card = ({property, activeProperty, setActiveProperty}) => {
    const {price, address, picture, city, bedrooms, bathrooms, carSpaces, index} = property;
    const activeClass = property === activeProperty ? 'is-active': '';
    return <div
        id={`card-${index}`}
        onClick={()=>{setActiveProperty(property, false)}}
        className={`card col-sm-12 col-md-6 col-lg-4 ${activeClass}`}>
        <img src={picture} alt="Singer" />
        <p className="price">{priceFormat(price)}</p>
        <div className="details">
            <span className="index">{index + 1}</span>
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
    activeProperty: PropType.object.isRequired,
    setActiveProperty: PropType.func.isRequired
};

export default Card;