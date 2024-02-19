import React from 'react';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
      <a className="navbar-brand text-white" href="/" style={{ fontSize: '35px' }}>Home Cleaning Services</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto custom-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">Our Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/quote">Quote</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
