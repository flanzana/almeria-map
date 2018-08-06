import React, { Component } from 'react';

class PlaceItem extends Component {

	render() {
		const { lugar, handleClickPlace } = this.props;

		return(
			<li
				className="list-item"
				onClick={handleClickPlace}
			>
				{lugar.name}
			</li>
		)
	}

};

export default PlaceItem;
