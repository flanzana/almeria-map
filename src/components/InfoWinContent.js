import React, { Component } from 'react';

class InfoWinContent extends Component {

	render() {
	
	const { title, address, category } = this.props;
	//console.log(this.props);

		return(
			<div className="info-window" tabIndex="0" aria-label="Info window of selected place">
				<h3 className="info-title" tabIndex="0">{title}</h3>
				<p className="info-category" tabIndex="0">{category}</p>
				
				{/* If address is undefined, disply text as no address found.*/}
				{address &&
				<p className="info-address" tabIndex="0">{address}, Almería, Spain</p>}
				{address === undefined &&
				<p className="info-address" tabIndex="0">No address found on Foursquare.</p>}
				
			</div>
		);
	}
};

export default InfoWinContent;
