import React, { Component } from 'react';
import InfoWinContent from './InfoWinContent.js';

class MapAlmeria extends Component {
	state = {
		markers: []

	}

	initMap = () => {
		const { lugares, mapCenter, mapZoom } = this.props;
		
		const map = new window.google.maps.Map(document.getElementById('map-container'), {
			center: mapCenter,
			zoom: mapZoom
		});
	}

	render() {
		//const { } = this.state;
		const { lugares, mapCenter, mapZoom } = this.props;
		
		return(
			<div id="map-container">
				<InfoWinContent
					lugares={lugares}
					mapCenter={mapCenter}
          			mapZoom={mapZoom}
				/>
			</div>
		);
	}
};

export default MapAlmeria;
