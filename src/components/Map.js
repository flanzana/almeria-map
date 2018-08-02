import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
   render() {
   const AlmeriaMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 36.838647, lng: -2.46002 } }
        defaultZoom = { 14 }
      >
      </GoogleMap>
   ));
   
   return(
      <div id="map-container">
        <AlmeriaMap
          containerElement={ <div className="container-element"/> }
          mapElement={ <div className="map-element"/> }
        />
      </div>
   );
   }
};

export default Map;
