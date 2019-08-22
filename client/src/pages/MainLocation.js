import React, { Component } from "react";
import {NavbarMain} from "../components/Navbar";
//import API from "../utils/API";
//import { Redirect } from 'react-router-dom'
import "./style.css";

class MainLocation extends Component {
    state = {
    };

/*componentDidMount() {
    API.get()
        .then(res => this.setState({}))
        .catch(err => console.log(err));
};*/

/*handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      
    });
};*/

render() {
    return (
        <div className="generalBOXpink bg-light">
            <NavbarMain/>
        </div>
    );
}
};

export default MainLocation;