import React, { Component } from 'react';

class PlaceItem extends Component {
	onPlaceClick = (e, lugar) => {
		this.props.onClick(e, lugar);
	}

	onPlaceKeyPress = (e, lugar) => {
		this.props.onKeyPress(e, lugar);
	}

	render() {
		const { lugar } = this.props;

		return(
			<li
				className="list-item"
				onClick={(e) => this.onPlaceClick(e, lugar)}
				onKeyPress={(e) => this.onPlaceKeyPress(e, lugar)}
				tabIndex="0"
				aria-label={`Button to the place ${lugar.name}`}
				role="menuitem"
			>
				{lugar.name}
			</li>
		)
	}

};

export default PlaceItem;
