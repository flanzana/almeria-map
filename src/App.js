import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Map from './components/Map.js'
import Menu from './components/Menu.js'

class App extends Component {
  state = {
    menuShow: true
  }

  /* Hide or show menu */
  toggleMenu = () => {
    const menuShow = this.state.menuShow;
    this.setState({menuShow : !menuShow})
  }

  render() {
    const { menuShow } = this.state;

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

          <section className="App-map"><Map/></section>
        </div>

        <footer className="App-footer">
          <p className="footer-text">Coded with &#10084; by Žana Flander &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
