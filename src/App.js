import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Menu from './components/Menu.js';
import sortBy from 'sort-by';

// handle an authentication failure of Google Maps.
// help: https://developers.google.com/maps/documentation/javascript/events
window.gm_authFailure = () => {
  const msg = document.getElementById('map-container');
  msg.innerHTML = `<h2>Authentication failure!</h2><p>Please, check Console for possible error or try again later.<p>`;
}

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
  help: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
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
        const places = placesRaw.map(place => {
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
        places.sort(sortBy('name'));
        this.setState({places});

        this.getCategories();

        // show all places by default on map and list
        this.setState({lugares: places});
      })
      // handle error if data is not loaded
      .catch(function(error) {
        alert('An error has occurred while loading data from Foursquare API. Please, refresh the page or try again later.');
      });
  }
  
  // get all categories from the places we got from foursquare
  getCategories() {
    const allCategories = [];
    this.state.places.map(lugar => {return( allCategories.push(lugar.category) )});
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

    //console.log('e.value:', e.value);
    //console.log(this.state.places);

    this.filteredPlaces(e);
  }

  clickMarker = (marker, e) => {
    this.setState({selectedMarker: marker});
  }

 /* updated array lugares based on selected category */
  filteredPlaces(e) {
    if (e.value === "All categories") {
      this.setState({lugares: this.state.places});
    } else {
      const filteredPlaces = this.state.places.filter(place => e.value === place.category);
      //console.log(filteredPlaces);
      this.setState({lugares: filteredPlaces});
    }
  }

  /* Hide or show menu */
  toggleMenu = () => {
    const menuShow = this.state.menuShow;
    this.setState({menuShow : !menuShow})
  }

  /* handle when place from list is clicked or keypressed: open marker's info window */
  handleClickPlace = (e, lugar) => {
    console.log('You clicked a place.');
    this.clickMarker(lugar, e);
  }
  handleKeyPressPlace = (e, lugar) => {
    console.log('You pressed a place.');
    this.clickMarker(lugar, e);
  }

  /* when closing infowindow, none marker is selected */
  closeInfoWin = () => {
    this.setState({selectedMarker: false});
  }

  render() {
    const { menuShow, lugares, mapCenter, mapZoom, selectedMarker, categoriesList, selectedCategory } = this.state;

    //console.log(categoriesList);
    //console.log('Selected category:', selectedCategory);
    //console.log('Selected marker:');
    //console.log(selectedMarker);
    //console.log("Lugares:");
    //console.log(lugares);


    return (
      <div className="App" role="main">
        <header className="App-header">
          <button id="hamburger-icon" onClick={this.toggleMenu} tabIndex="0">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <h1 className="App-title" tabIndex="0">Almería</h1>
        </header>

        <div className="App-main">

          {menuShow === true ? 
            <Menu
              lugares={lugares}
              categoriesList={categoriesList}
              updateSelectedCategory={this.updateSelectedCategory}
              selectedCategory={selectedCategory}
              clickMarker={this.clickMarker}
              onPlaceClick={this.handleClickPlace}
              onPlaceKeyPress={this.handleKeyPressPlace}
              tabIndex="0"
            /> 
            : 
            <div className="App-menu-hidden" tabIndex="-1" aria-hidden="true"></div>
          }

          <section className="App-map" role="application" tabIndex="0">
              <Map
                lugares={lugares}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                selectedMarker={selectedMarker}
                clickMarker={this.clickMarker}
                selectedCategory={selectedCategory}
                closeInfoWin={this.closeInfoWin}
              />
          </section>
        </div>

        <footer className="App-footer">
          <p className="footer-text" tabIndex="0">Coded with &#10084; by Žana Flander &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
