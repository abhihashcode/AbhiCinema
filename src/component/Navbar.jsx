import React, { Component } from 'react'
import '../style/Navbar.css';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className='nav-container'>
        <Link className="link logo" to="/"><h1 className='nav-logo'>AbhiCinema</h1></Link>
        <Link className="link menu" to="/favourites"><h4 className='nav-menu'>Favourite</h4></Link>
      </div>
    )
  }
}
