import React from 'react';
import PropType from 'prop-types';
import {priceFormat} from './utils/Formatters';
import picture1 from '../assets/1.jpg';
import picture2 from '../assets/2.jpg';
import picture3 from '../assets/3.jpg';
import picture4 from '../assets/4.jpg';
import picture5 from '../assets/5.jpg';

const Card = ({property, activeProperty, setActiveProperty}) => {
    const {price, address, picture, city, bedrooms, bathrooms, carSpaces, index} = property;
    const activeClass = property === activeProperty ? 'is-active': '';
    const pictures = {
        'picture1': picture1,
        'picture2': picture2,
        'picture3': picture3,
        'picture4': picture4,
        'picture5': picture5,
    };
    return <div
        id={`card-${index}`}
        onClick={()=>{setActiveProperty(property, false)}}
        className={`card col-sm-12 col-md-6 col-lg-4 ${activeClass}`}>
        <img src={pictures[picture]} alt="Singer" />
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