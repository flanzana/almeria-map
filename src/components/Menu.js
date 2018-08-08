import React, { Component } from 'react';
import Dropdown from 'react-accessible-dropdown';
import PlaceItem from './PlaceItem.js';
class Menu extends Component {

	handleChangeCategory = (e) => {
		//console.log(e);
		this.props.updateSelectedCategory(e);
	}

	render() {
		const { lugares, categoriesList, selectedCategory, onPlaceClick, onPlaceKeyPress } = this.props;

		let onPlaceClickHandle = (e, lugar) => {
			onPlaceClick(e, lugar)
		}

		let onPlaceKeyPressHandle = (e, lugar) => {
			onPlaceKeyPress(e, lugar)
		}

		return(
			<div className="App-menu">
				<div id="filter-container">
					<span className="filter-text">Select a category:</span>
					<div id="filter-container-select">
						<i className="fa fa-filter" aria-hidden="true"></i>
						<div id="drop-menu" tabIndex="0">
							{/* help: https://www.npmjs.com/package/react-dropdown
							At the end I installed extension react-accessible-dropdown, 
							because react-dropdown had no option to add a11y. */}
							<Dropdown
								options={categoriesList}
								onChange={this.handleChangeCategory}
								value={selectedCategory}
								placeholder="Select a category..."
								/* Accessibility is implemented by default with react-accessible-dropdown (not possible to change it). */
							/>
						</div>
					</div>
				</div>

				<ul id="list-places" role="menu" aria-label="List of all places from Foursquare list">
					{lugares.map((lugar, index) => 
						(<PlaceItem
							key={index}
							lugar={lugar}
							onClick={onPlaceClickHandle}
							onKeyPress={onPlaceKeyPressHandle} //This needs to be added because of a11y when using tabIndex.
						/>)
					)}
				</ul>
				<a href="https://foursquare.com/user/507697890/list/almeria"
					target="_blank"
					className="source"
					role="link"
					tabIndex="0"
					aria-label="Link to source of places on Foursquare">
					Source of places: Foursquare
				</a>
			</div>

		);
	}
};

export default Menu;
