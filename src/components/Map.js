import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

/* source of help: 
- https://www.npmjs.com/package/react-google-maps
- https://tomchentw.github.io/react-google-maps/
*/

const lugares = [
	{
		title: 'almer 1',
		location: {lat: 36.833, lng: -2.4604}
	},{
		title: 'almer 2',
		location: {lat: 36.843, lng: -2.4704}
	}
];

console.log(lugares);

const AlmeriaMap = withGoogleMap(props => (
	<GoogleMap
		defaultCenter = { { lat: 36.838647, lng: -2.46002 } }
		defaultZoom = { 14 }
	>
		{props.isMarkerShown && lugares.map(lugar => {
			return (
				<Marker
					name={lugar.title}
					position={lugar.location}
				/>
			)
		})}
	</GoogleMap>
));


class Map extends Component {
	state = {
		isMarkerShown: true
	}

	render() {
		return(
			<div id="map-container">
				<AlmeriaMap
					containerElement={ <div className="container-element"/> }
					mapElement={ <div className="map-element"/> }
					isMarkerShown={this.state.isMarkerShown}
				/>

			</div>
		);
	}
};

export default Map;
