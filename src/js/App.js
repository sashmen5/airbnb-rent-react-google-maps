import React from 'react';
import data from './data/Data';
import Card from "./Card";
import GoogleMap from "./GoogleMap";
import jump from 'jump.js'
import {easeInOutCubic} from "./utils/Easing";
import Header from "./Header";
import image from '../images/location-map.svg';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            properties: data.properties,
            activeProperty: data.properties[0],
            filterIsVisible: false,
            filteredProperties: [],
            isFiltering: false,
            filterBedrooms: 'any',
            filterBathrooms: 'any',
            filterCars: 'any',
            priceFrom: 500000,
            priceTo: 1000000,
            filterSort: 'any'
        };
    }

    handleFilterChange = (e) => {
        const target = e.target;
        const {value, name} = target;
        this.setState({
            [name]: value
        }, () => {
            this.filterProperties();
        });
    };

    filterProperties = () => {
        const {properties, filterBedrooms, filterBathrooms, filterCars, filterSort, priceFrom, priceTo} = this.state;
        const isFiltering =
            filterBedrooms !== 'any' ||
            filterBathrooms !== 'any' ||
            priceFrom !== '0' ||
            priceTo !== '1000001' ||
            filterSort !== 'any' ||
            filterCars !== 'any';

        const getFilteredProperties = (properties) => {
            const filteredProperties = [];
            properties.map(property => {
                const {bedrooms, bathrooms, carSpaces, price} = property;
                const match =
                    (bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any') &&
                    (bathrooms === parseInt(filterBathrooms) || filterBathrooms === 'any') &&
                    (price >= priceFrom && price <= priceTo) &&
                    (carSpaces === parseInt(filterCars) || filterCars === 'any');

                match && filteredProperties.push(property);
            });

            switch(filterSort) {
                case '0':
                    filteredProperties.sort((a,b) => a.price - b.price);
                    break;
                case '1':
                    filteredProperties.sort((a,b) => b.price - a.price);
                    break;
            }

            return filteredProperties;
        };

        this.setState({
            filteredProperties: getFilteredProperties(properties),
            isFiltering: isFiltering,
            activeProperty: getFilteredProperties(properties)[0] || properties[0],
        })
    };

    toggleFilter = (e) => {
        e.preventDefault();
        this.setState({
            filterIsVisible: !this.state.filterIsVisible
        })
    };

    clearFilter = (e, form) => {
        e.preventDefault();
        this.setState({
            properties: this.state.properties.sort((a,b) => a.index - b.index),
            filterBedrooms: 'any',
            filterBathrooms: 'any',
            filterCars: 'any',
            filterSort: 'any',
            filteredProperties: [],
            isFiltering: false,
            priceFrom: 500000,
            priceTo: 1000000,
            activeProperty: this.state.properties[0],
        });
        form.reset();
    };

    setActiveProperty = (property, scroll) => {
        const {index} = property;
        this.setState({
            activeProperty: property
        });

        if (scroll) {
            const target = `#card-${index}`;
            jump(target, {
                duration: 800,
                easing: easeInOutCubic,
            });
        }
    };

    render() {
        const {properties, activeProperty, filterIsVisible, filteredProperties, isFiltering} = this.state;
        const propertiesList = isFiltering ? filteredProperties : properties;
        return (
            <div>
                <div className="listings">
                    <Header
                        filterIsVisible={filterIsVisible}
                        handleFilterChange={this.handleFilterChange}
                        clearFilter={this.clearFilter}
                        toggleFilter={this.toggleFilter}/>
                    <div className="cards container">
                        <div className={`cards-list row ${propertiesList.length === 0 ? 'is-empty' : ''}`}>
                            {
                                propertiesList.map(property => {
                                    return <Card
                                        key={property._id}
                                        setActiveProperty={this.setActiveProperty}
                                        activeProperty={activeProperty}
                                        property={property}/>
                                })
                            }
                            {
                                (isFiltering && propertiesList.length === 0) && <p className='warning'>
                                    <img src={image} alt=""/>
                                    No properties were   found.</p>

                            }
                        </div>
                    </div>
                </div>

                <GoogleMap
                    properties={properties}
                    activeProperty={activeProperty}
                    filteredProperties={filteredProperties}
                    isFiltering={isFiltering}
                    setActiveProperty={this.setActiveProperty}/>
            </div>
        )
    }
}

export default App;