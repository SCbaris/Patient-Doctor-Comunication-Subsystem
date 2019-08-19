import React from "react";
import "./style.css";


export function NavbarMain(props) {
  var picStyles = {
    width:'100px',
    height:'100px',
  };
  var navBarStyles = {
      color:'white',
      backgroundColor:'#dd095e',
  };
  var textColorWhite ={
      color:'white',
  }
  return (
    <div className="navbar navbar-expand-lg mb-3" style={navBarStyles}>
      <a className="navbar-brand" href="/">
        <img className="d-inline-block align-top" style={picStyles} alt="Main Page Logo" src="https://thecondecenter.com/wp-content/uploads/2016/06/conde-center-metronome-payment-icon-medicare.png"/>
      </a>
      <ul className="nav justify-content-end float-right">
        <li className="nav-item">
          <a href="/signin" id="signin" style={textColorWhite} className="nav-link">New Patient</a>
        </li>
        <li className="nav-item">
          <a href="/main/location" id="location" style={textColorWhite} className="nav-link">Location</a>
        </li>
        <li className="nav-item">
          <a href="/login" id="login" style={textColorWhite} className="nav-link">Log In</a>
        </li>

      </ul>
    </div>
  );
}

export function NavbarPatient(props) {
  var picStyles = {
    width:'100px',
    height:'100px',
  };
  var navBarStyles = {
      backgroundColor:'#dd095e',
  };
  var textColorWhite ={
      color:'white',
  }
  return (
    <div className="navbar navbar-expand-lg mb-3" style={navBarStyles}>
      <a className="navbar-brand" href="/patient">
        <img className="d-inline-block align-top" style={picStyles} alt="Hospital logo" src="https://icons-for-free.com/iconfiles/png/512/content+favorite+heart+love+icon-1320087226362598814.png"/>
      </a>
      <ul className="nav justify-content-end float-right">
        <li className="nav-item">
          <a href="/patient/appointment" id="appointment" style={textColorWhite} className="nav-link">New Appointment</a>
        </li>
        <li className="nav-item">
          <a href="/patient/location" id="location" style={textColorWhite} className="nav-link">Location</a>
        </li>
        <li className="nav-item">
          <a href="/" onClick={() => props.logout()} id="logout" style={textColorWhite} className="nav-link">Log Out</a>
        </li>
      </ul>
    </div>
  );
}

export function NavbarBlueEmpty(props) {
  var picStyles = {
    width:'100px',
    height:'100px',
  };
  var textColorWhite ={
    color:'white',
  };
  return (
    <div className="navbar navbar-expand-lg bg-info text-white mb-3">
      <a className="navbar-brand text-white" href="/doctor">
        <img className="d-inline-block align-top" style={picStyles} alt="Hospital logo" src="https://www.liver.ca/wp-content/uploads/2017/09/Doctor-Teal.png"/>
      </a>
      <li className="nav-item">
          <a href="/" onClick={() => props.logout()} id="logout" style={textColorWhite} className="nav-link">Log Out</a>
      </li>
    </div>
  );
}

export function NavbarPinkEmpty(props) {
  var picStyles = {
    width:'100px',
    height:'100px',
  };
  var textColorWhite ={
    color:'white',
  };
  var navBarStyles = {
    backgroundColor:'#dd095e',
  };
  return (
    <div className="navbar navbar-expand-lg mb-3" style={navBarStyles}>
      <a className="navbar-brand" href="/"> 
        <img className="d-inline-block align-top" style={picStyles} alt="Hospital logo" src="https://thecondecenter.com/wp-content/uploads/2016/06/conde-center-metronome-payment-icon-medicare.png"/>
      </a>
    </div>
  );
}

export function NavbarPinkEmptyPatient(props) {
  var picStyles = {
    width:'100px',
    height:'100px',
  };
  var textColorWhite ={
    color:'white',
  };
  var navBarStyles = {
    backgroundColor:'#dd095e',
  };
  return (
    <div className="navbar navbar-expand-lg mb-3" style={navBarStyles}>
      <a className="navbar-brand" href="/patient">
        <img className="d-inline-block align-top" style={picStyles} alt="Hospital logo" src="https://icons-for-free.com/iconfiles/png/512/content+favorite+heart+love+icon-1320087226362598814.png"/>
      </a>
      <li className="nav-item">
          <a href="/" onClick={() => props.logout()} id="login" style={textColorWhite} className="nav-link">Log Out</a>
      </li>
    </div>
  );
}

