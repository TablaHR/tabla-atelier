/* eslint-disable react/prop-types */
import React from 'react';
import './css/Header.css'

var Header = function (props) {

  return (
    <div className="header">
      <div className="header-logo"><img src="/tabla_marketplace.png"
     alt="Tabla Marketplace Logo" height="5vh" />
        <div className="header-announcement">
          <h4>{props.announcement || ''}</h4>
        </div>
      </div>
      <div className="change-to-next-product">
        <button onClick={props.changeToNextProduct}>Change to Next Product</button>
      </div>
    </div>
  );
}

export default Header;