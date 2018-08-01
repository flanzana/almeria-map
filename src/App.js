import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Almeria</h1>
        </header>

        <i className="fa fa-bars" id="hamburger-icon" aria-hidden="true"></i>

        <div className="App-main">
          {/*<div id="menu-container">aa menu aaaa</div>*/}
          <Map/>
        </div>

        <footer className="App-footer">
          <p className="footer-text">Coded with &#10084; by Žana Flander &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
