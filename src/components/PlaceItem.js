import React, { Component } from 'react';

class PlaceItem extends Component {
	onPlaceClick = (e, lugar) => {
		this.props.onClick(e, lugar);
	}

	render() {
		const { lugar } = this.props;

		return(
			<li
				className="list-item"
				onClick={(e) => this.onPlaceClick(e, lugar)}
			>
				{lugar.name}
			</li>
		)
	}

};

export default PlaceItem;
