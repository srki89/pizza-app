import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Navi extends Component {


  render(){
    return (
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                  <a className="navbar-brand" href="/">Yummi<br /><small>PIZZA</small></a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                  </button>
                  <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                      <li><Link to={'/'} className="nav-link mr-3">Home</Link></li>
                      <li><Link to={'/about'} className="nav-link mr-3">About</Link></li>
                      <li><Link to={'/contact'} className="nav-link mr-3">Contact</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
    )
  }
}
export default Navi;
