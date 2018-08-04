import React, { Component } from 'react';
import Map from './Map.js';

class InfoWinContent extends Component {

	render() {
	
	const { title, location, address, category } = this.props;
	console.log(this.props);

		return(
			<div className="info-window">
				<h3 className="info-title">{title}</h3>
				<p className="info-category">{category}</p>
				
				{/* If address is undefined, disply text as no address found.*/}
				{address &&
				<p className="info-address">{address}, Almería, Spain</p>}
				{address === undefined &&
				<p className="info-address">No address found on Foursquare.</p>}
				
			</div>
		);
	}
};

export default InfoWinContent;
