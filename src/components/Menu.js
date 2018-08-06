import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

class Menu extends Component {

	handleChangeCategory = (e) => {
		//console.log(e);
		this.props.updateSelectedCategory(e);
	}

	render() {
		const { lugares, categoriesList, selectedCategory, handleClickPlace } = this.props;

		return(
			<div className="App-menu">
				<div id="filter-container">
					<span className="filter-text">Select a category:</span>
					<div id="filter-container-select">
						<i className="fa fa-filter" aria-hidden="true"></i>
						<div id="drop-menu">
							{/* https://www.npmjs.com/package/react-dropdown */}
							<Dropdown
								options={categoriesList}
								onChange={this.handleChangeCategory}
								value={selectedCategory}
								placeholder="Select a category..."
							/>
						</div>
					</div>
				</div>

				<ul id="list-places">
					{lugares.map(lugar => {
						return(
							<li className="list-item" onClick={handleClickPlace}>{lugar.name}</li>
						)
					})}
				</ul>
			</div>

		);
	}
};

export default Menu;
