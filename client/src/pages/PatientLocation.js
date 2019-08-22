import React, { Component } from "react";
import {NavbarPinkEmptyPatient} from "../components/Navbar";
//import API from "../utils/API";
//import { Redirect } from 'react-router-dom'
import "./style.css";

class PatientLocation extends Component {
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

logout = () => {
    sessionStorage.clear();
}

render() {
    return (
        <div className="generalBOXpink bg-light">
            <NavbarPinkEmptyPatient logout={this.logout} />
        </div>
    );
}
};

export default PatientLocation;