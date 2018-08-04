import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import InfoWinContent from './InfoWinContent.js';

/* source of help: 
- https://www.npmjs.com/package/react-google-maps
- https://tomchentw.github.io/react-google-maps/
*/

const AlmeriaMap = compose(
	withStateHandlers(() => ({isInfoWinOpen : false}), 
		{toggleInfoWin: ({isInfoWinOpen}) => () => ({isInfoWinOpen :!isInfoWinOpen})
		}
	),
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBoSUNfwL_Sbu_ukPlr0a2swRZuFKW0NBA",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div className="container-element"/>,
		mapElement: <div className="map-element"/>
	}),
	withScriptjs,
	withGoogleMap
)(props => (
	<GoogleMap
		defaultCenter = { props.mapCenter }
		defaultZoom = { props.mapZoom }
	>
		{props.lugares.map((lugar, index) => {
			return (
				//help: https://tomchentw.github.io/react-google-maps/#marker
				<Marker
					key={index}
					title={lugar.name}
					position={lugar.location}
					onClick={props.toggleInfoWin}
					//animation={}
				>
					{/*help: https://tomchentw.github.io/react-google-maps/#infowindow*/}
					{props.isInfoWinOpen && <InfoWindow onCloseClick={props.toggleInfoWin}>
						{/*infowincontect is my component*/}
						<InfoWinContent
							title={lugar.name}
							location={lugar.location}
							address={lugar.address}
							category={lugar.category}
						/>
					</InfoWindow>}
				</Marker>
			)
		})}
	</GoogleMap>
));


class Map extends Component {
	state = {

	}

	render() {
		//const { } = this.state;
		const { lugares, mapCenter, mapZoom } = this.props;
		
		return(
			<div id="map-container">
				<AlmeriaMap
					lugares={lugares}
					mapCenter={mapCenter}
          mapZoom={mapZoom}
				/>
			</div>
		);
	}
};

export default Map;
