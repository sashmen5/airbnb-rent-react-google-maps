import React from 'react';
import PropTypes from 'prop-types';

class GoogleMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const {activeProperty, filteredProperties, isFiltering} = nextProps;
        const {latitude, longitude, index} = activeProperty;

        const {markers} = this.state;
        this.closeIws();

        if (isFiltering && filteredProperties.length === 0 ) {
            this.closeIws();
        } else {
            this.closeIws();
            this.showIw(index)
        }
    }


    componentDidMount() {
        const {properties, activeProperty} = this.props;
        const {latitude, longitude} = activeProperty;
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: latitude, lng: longitude},
            mapTypeControl: false,
            zoom: 15
        });

        this.createMarkers(properties);
    }

    componentDidUpdate() {
        const {filteredProperties, isFiltering} = this.props;
        const {markers} = this.state;
        markers.forEach(marker => {
            const {property} = marker;

            if (isFiltering) {
                if (filteredProperties.includes(property)) {
                    markers[property.index].setVisible(true);
                } else {
                    markers[property.index].setVisible(false);
                }
            } else {
                markers[property.index].setVisible(true);
            }
        })

    }

    createMarkers(properties) {
        const {setActiveProperty, activeProperty} = this.props;
        const activePropertyIndex = activeProperty.index;
        const {markers} = this.state;
        properties.map(property => {
            const {latitude, longitude, index, address} = property;
            this.marker = new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map: this.map,
                label: {
                    color: '#ffffff',
                    text: `${index + 1}`
                },
                icon: {
                    url: 'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png', //TODO: change to own url,
                    size: new google.maps.Size(22, 55),
                    origin: new google.maps.Point(0, -15),
                    anchor: new google.maps.Point(11, 52)
                },
                property
            });

            const iw = new google.maps.InfoWindow({
                content: `<h1>${address}</h1>`
            });

            this.marker.iw = iw;

            this.marker.addListener('click', () => {
                this.closeIws();
                setActiveProperty(property, true);
            });

            markers.push(this.marker);

            this.showIw(activePropertyIndex);
        });
    }

    showIw(index) {
        const {markers} = this.state;
        markers[index] && markers[index].iw.open(this.map, markers[index]);
    }


    closeIws() {
        const {markers} = this.state;
        markers.forEach((marker) => {
            marker.iw.close();
        });
    }

    render() {
        return (
            <div className="mapContainer">
                <div id="map" ref="map"></div>
            </div>
        )
    }


}

GoogleMap.propTypes = {
    properties: PropTypes.array.isRequired,
    setActiveProperty: PropTypes.func.isRequired,
    activeProperty: PropTypes.object.isRequired,
    filteredProperties: PropTypes.array,
    isFiltering: PropTypes.bool.isRequired
};

export default GoogleMap;