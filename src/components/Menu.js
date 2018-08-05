import React, { Component } from 'react';

class Menu extends Component {

	render() {
		const { lugares, categoriesList } = this.props;

		return(
			<div className="App-menu">

				<div id="filter-container">
					<i class="fa fa-filter" aria-hidden="true"></i>
					<select id="categories-select">
						<option value="all">All categories</option>
						{categoriesList.map(cat => {
							return(
								<option value={cat}>{cat}</option>)
						})}

					</select>
				</div>

				<ul id="list-places">
					{lugares.map(lugar => {
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
