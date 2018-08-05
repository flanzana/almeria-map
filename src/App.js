import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Menu from './components/Menu.js';
import sortBy from 'sort-by';

class App extends Component {
  state = {
    mapCenter: { lat: 36.833045, lng: -2.458947 },
    mapZoom: 14,
    menuShow: true,
    places: [],
    lugares: [],
    categoriesList: [],
    selectedCategory: 'All categories',
    selectedMarker: false
  }

  componentDidMount() {
    this.getDetailsOfList();
  }

  /* 
  Get details of a created list from Foursquare 
  my list: https://foursquare.com/user/507697890/list/almeria (ID_list: 5b6043856bdee6002c29f447)
  help: https://developer.foursquare.com/docs/api/lists/details
  */
  getDetailsOfList() {
    const p = {
      list_id: '5b6043856bdee6002c29f447',
      client_id: '0QU2IN3SIRC4MMAKZ1CGYHPDITRAE1RY2RBDETMG21NAZDZX',
      client_secret: 'HIO1OE0ELSVBXJ0P4M0LORRLGQJFFGVR0UH0KE2YHEG0GEJD',
      version: '20171227'
    };
    const reqURL = `https://api.foursquare.com/v2/lists/${p.list_id}?client_id=${p.client_id}&client_secret=${p.client_secret}&v=${p.version}`;
    fetch(reqURL)
      .then(response => response.json())
      .then(data => {
        const dataRaw = data.response;
        //console.log(dataRaw);

        // save items of list to array placesRaw
        const placesRaw = dataRaw.list.listItems.items;
        //console.log("placesRaw (raw data from Foursquare:");
        //console.log(placesRaw);

        // save name and location to array places
        const lugares = placesRaw.map(place => {
          return({
            id: place.id,
            name: place.venue.name,
            location: {lat: place.venue.location.lat, lng: place.venue.location.lng},
            address: place.venue.location.address,
            category: place.venue.categories[0].name
          })
        });
        //console.log("Places from Foursquare's list Almeria (const places):");
        //console.log(places);
        // sort list of places by alphabetical name
        lugares.sort(sortBy('name'));
        this.setState({lugares});

        this.getCategories();

        //this.filterPlaces();
      })
  }
  
  // get all categories from the places we got from foursquare
  getCategories() {
    const allCategories = [];
    this.state.lugares.map(lugar => {return( allCategories.push(lugar.category) )});
    //console.log(allCategories);

    // remove duplicated categories
    const arr = [...new Set(allCategories)];
    //console.log(arr);
    arr.push('All categories');

    // sort list of categories by alphabetical name
    arr.sort();
       
    this.setState({categoriesList: arr});
    //console.log(this.state.categoriesList);
  }

  updateSelectedCategory = (e) => {
    this.setState({selectedCategory: e.value});
    this.setState({selectedMarker: false});
  }

  clickMarker = (marker) => {
    this.setState({selectedMarker: marker})
  }

/*
  // push only places based on category to array lugares
  filterPlaces() {
    const { places, selectedCategory, categoriesList } = this.state;
    console.log(places);
    console.log(selectedCategory);
    console.log(categoriesList);

    if (selectedCategory === undefined) {
      this.setState({lugares: places});
    }
  
    const filteredArray = [];
    places.filter(place => selectedCategory === place.category).map(place => {
      return(
        filteredArray.push(place)
        this.setState({lugares: filteredArray})
      )
    })

  }
*/

  /* Hide or show menu */
  toggleMenu = () => {
    const menuShow = this.state.menuShow;
    this.setState({menuShow : !menuShow})
  }

  /* handle when place from list is clicked: open marker's info window */
  handleClickPlace = (lugar) => {
    console.log('You clicked a place.');
  }

  render() {
    const { menuShow, lugares, mapCenter, mapZoom, selectedMarker, categoriesList, selectedCategory } = this.state;

    console.log('Selected category:', selectedCategory);

    console.log('Selected marker:');
    console.log(selectedMarker);

    return (
      <div className="App">
        <header className="App-header">
          <button id="hamburger-icon" onClick={this.toggleMenu}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <h1 className="App-title">Almeria</h1>
        </header>

        <div className="App-main">

          {menuShow === true ? 
            <Menu
              lugares={lugares}
              categoriesList={categoriesList}
              updateSelectedCategory={this.updateSelectedCategory}
              selectedCategory={selectedCategory}
              handleClickPlace={this.handleClickPlace}
            /> 
            : 
            <div className="App-menu-hidden"></div>
          }

          <section className="App-map">
              <Map
                lugares={lugares}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                selectedMarker={selectedMarker}
                clickMarker={this.clickMarker}
                selectedCategory={selectedCategory}
                handleClickPlace={this.handleClickPlace}
              />
          </section>
        </div>

        <footer className="App-footer">
          <p className="footer-text">Coded with &#10084; by Žana Flander &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
