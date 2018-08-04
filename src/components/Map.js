import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import InfoWinContent from './InfoWinContent.js';


/* ------------ COMPOSE A MAP WITH REACT-GOOGLE-MAPS ------------
source of help: 
- https://www.npmjs.com/package/react-google-maps
- https://tomchentw.github.io/react-google-maps/
*/
const AlmeriaMap = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBoSUNfwL_Sbu_ukPlr0a2swRZuFKW0NBA",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div className="container-element"/>,
		mapElement: <div className="map-element"/>
	}),
	withScriptjs,
	withGoogleMap
)(props => {
	return (
		<GoogleMap
			defaultCenter = { props.mapCenter }
			defaultZoom = { props.mapZoom }
		>
			{props.markers.map((marker, index) => {
				const onClick = props.onClick.bind(this, marker)
				return (
					//help: https://tomchentw.github.io/react-google-maps/#marker
					<Marker
						key={index}
						title={marker.name}
						position={marker.location}
						onClick={onClick}
						//animation={}
					>
						{/*help: https://gist.github.com/jwo/43b382fc60eb09d3a415c9953f4057f8*/}
						{props.selectedMarker === marker && <InfoWindow>
							{/*infowincontent is my component*/}
							<InfoWinContent
								title={marker.name}
								location={marker.location}
								address={marker.address}
								category={marker.category}
							/>
						</InfoWindow>}
					</Marker>
				)
			})}
		</GoogleMap>
	)
});
/* ------------ END OF COMPOSE A MAP WITH REACT-GOOGLE-MAPS ------------ */


class Map extends Component {
	state = {
		selectedMarker: false
	}

	handleClickMarker = (marker, e) => {
		this.setState({selectedMarker: marker})
	}

	render() {
		//const { } = this.state;
		const { lugares, mapCenter, mapZoom } = this.props;
		const { selectedMarker } = this.state;

		return(
			<div id="map-container">
				<AlmeriaMap
					markers={lugares}
					mapCenter={mapCenter}
          mapZoom={mapZoom}
          selectedMarker={selectedMarker}
          onClick={this.handleClickMarker}
				/>
			</div>
		);
	}
};

export default Map;
