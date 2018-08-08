/*global google*/

import React, { Component } from 'react';
import { compose, withProps } from "recompose"
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
	withScriptjs, //withScriptjs is using loadingElement to get rendered while it is async-loading the google scripts. No need to include <script> tag in index.html.
	withGoogleMap //withGoogleMap is using googleMapURL to download the script from, including the API key
)(props => {
	return (
		<GoogleMap
			defaultCenter = { props.mapCenter }
			defaultZoom = { props.mapZoom }
		>

			{props.markers.map((marker, index) => {
				const onClick = props.onClick.bind(this, marker)
				//console.log(props.markers);

				return (
					//help: https://tomchentw.github.io/react-google-maps/#marker
					<Marker
						key={index}
						title={marker.name}
						position={marker.location}
						onClick={onClick}
						animation={//animation only for selected marker: https://stackoverflow.com/questions/44729776/how-can-animation-be-added-to-markers-in-react-google-maps
							(props.selectedMarker === marker) && (google.maps.Animation.BOUNCE)
						}
					>
						{/*help: https://gist.github.com/jwo/43b382fc60eb09d3a415c9953f4057f8*/}
						{props.selectedMarker === marker && <InfoWindow onCloseClick={props.closeInfoWin}>
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

	handleClickMarker = (marker, e) => {
		//console.log(e);
		this.props.clickMarker(marker, e);
	}

	render() {
		const { lugares, mapCenter, mapZoom, selectedMarker, selectedCategory, closeInfoWin } = this.props;

		return(
			<div id="map-container">
				<AlmeriaMap
					markers={lugares}
					mapCenter={mapCenter}
          			mapZoom={mapZoom}
          			selectedMarker={selectedMarker}
          			selectedCategory={selectedCategory}
          			onClick={this.handleClickMarker}
          			closeInfoWin={closeInfoWin}
				/>
			</div>
		);
	}
};

export default Map;
