import React, { Component } from "react";
import {NavbarMain} from "../components/Navbar";
import { Redirect } from 'react-router-dom'
import API from "../utils/API";
import "./style.css";

class Main extends Component {
    state = {
        sendingTo:"",
    };

componentDidMount() {
    var spec = sessionStorage.getItem('spec')
    //console.log(spec)
    this.setState({
      sendingTo : spec
    });
};

/*handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      
    });
};*/

render() {
    const spec =sessionStorage.getItem('spec')
    if (spec==="patient"){ return <Redirect to="/patient" />}
    else if (spec==="doctor"){ return <Redirect to="/doctor" />}
    return (
        <div className="generalBOXpink bg-light">
            <NavbarMain/>
        </div>
    );
}
};

export default Main;