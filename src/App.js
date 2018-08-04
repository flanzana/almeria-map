import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js';
//import MapAlmeria from './components/MapAlmeria.js';
import Menu from './components/Menu.js';

class App extends Component {
  state = {
    mapCenter: { lat: 36.833045, lng: -2.458947 },
    mapZoom: 14,
    menuShow: true,
    places: [],
    lugares: []
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

        // save items of list to array places
        const places = dataRaw.list.listItems.items;
        //console.log("Places (raw data from Foursquare:");
        //console.log(places);
        this.setState({places});

        // save name and location to array lugares
        const lugares = places.map(place => {
          return({
            id: place.id,
            name: place.venue.name,
            location: {lat: place.venue.location.lat, lng: place.venue.location.lng},
            address: place.venue.location.address,
            category: place.venue.categories[0].name
          })
        });
        console.log("Places from Foursquare's list Almeria (const lugares):");
        console.log(lugares);
        this.setState({lugares});
      })
  }

  /* Hide or show menu */
  toggleMenu = () => {
    const menuShow = this.state.menuShow;
    this.setState({menuShow : !menuShow})
  }

  render() {
    const { menuShow, lugares, mapCenter, mapZoom } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <button id="hamburger-icon" onClick={this.toggleMenu}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <h1 className="App-title">Almeria</h1>
        </header>

        <div className="App-main">

          {menuShow === true ? <Menu/> : <div className="App-menu-hidden"></div>}

          <section className="App-map">
              <Map
                lugares={lugares}
                mapCenter={mapCenter}
                mapZoom={mapZoom}
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
