import React, { Component } from 'react';
import sortBy from 'sort-by';
import Dropdown from 'react-dropdown';

class Menu extends Component {

	handleChangeCategory = (e) => {
		//console.log(e);
		this.props.updateCategory(e);
	}

	render() {
		const { lugares, categoriesList, selectedCategory } = this.props;

		// sort list of places by alphabetical name
		lugares.sort(sortBy('name'));
		// sort list of categories by alphabetical name
		categoriesList.sort();
		//console.log(categoriesList);	
		

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
					{selectedCategory === "All categories" && lugares.map(lugar => {
						return(
							<li className="list-item">{lugar.name}</li>
						)
					})}
					{lugares.filter(lugar => selectedCategory === lugar.category).map(lugar => {
						return(
							<li className="list-item">{lugar.name}</li>
						)
					})}
				</ul>
			</div>

		);
	}
};

export default Menu;
