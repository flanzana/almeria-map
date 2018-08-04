import React, { Component } from 'react';
import Map from './Map.js';

class InfoWinContent extends Component {

	render() {
	
	const { title, location, address, category } = this.props;
	console.log(this.props);

		return(
			<div>{title}</div>
		);
	}
};

export default InfoWinContent;
