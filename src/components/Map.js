import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

/* source of help: 
- https://www.npmjs.com/package/react-google-maps
- https://tomchentw.github.io/react-google-maps/
*/

const AlmeriaMap = withGoogleMap(props => (
	<GoogleMap
		defaultCenter = { props.mapCenter }
		defaultZoom = { props.mapZoom }
	>
		{props.isMarkerShown && props.lugares.map(lugar => {
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
		isMarkerShown: true,
	}

	render() {
		const { isMarkerShown } = this.state;
		const { lugares, mapCenter, mapZoom } = this.props;

		return(
			<div id="map-container">
				<AlmeriaMap
					containerElement={ <div className="container-element"/> }
					mapElement={ <div className="map-element"/> }
					isMarkerShown={isMarkerShown}
					lugares={lugares}
					mapCenter={mapCenter}
          mapZoom={mapZoom}
				/>

			</div>
		);
	}
};

export default Map;
