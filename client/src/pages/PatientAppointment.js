import React, { Component } from "react";
import {NavbarPatient} from "../components/Navbar";
import API from "../utils/API";
import { Redirect } from 'react-router-dom'

class PatientAppointment extends Component {
    state = {
        dobMM:"",
        dobDD:"",
        dobYYYY:"",
        aDateMM:"",
        aDateDD:"",
        aDateYYYY:"",
        todaysDay:"",
        todaysMonth:"",
        todaysYear:"",
        reasonOfAppoitment:"",
        sendingTo:"",
    };


/*componentDidMount() {
    var d = new Date();
    var todaysMonth = d.getMonth(); // this one give us to month
    var todaysDay = d.getDate(); // this one give us day
    if(this.state.aDateMM>=todaysMonth) todaysDay = 1;
    var todaysYear = d.getFullYear(); // this one give us year
    this.setState({
        todaysDay: todaysDay,
        todaysMonth: todaysMonth,
        todaysYear: todaysYear
      });

};*/

handleInputChange = event => {
    event.preventDefault();
    var d = new Date();
    var todaysDay ;
    var todaysMonth = d.getMonth(); // this one give us to month
    if(this.state.aDateMM>=todaysMonth+1) todaysDay = 1;
    else todaysDay = d.getDate(); // this one give us day
    var todaysYear = d.getFullYear(); // this one give us year
    const { name, value } = event.target;
    this.setState({
        todaysDay: todaysDay,
        todaysMonth: todaysMonth,
        todaysYear: todaysYear,
        [name]: value
    });
};

logout = () => {
    sessionStorage.clear();
}


submitCase = event => {
    event.preventDefault();
    const token =sessionStorage.getItem('token')
    const id =sessionStorage.getItem('id')
    var dob=this.state.dobMM + "/" + this.state.dobMM + "/" + this.state.dobYYYY;
    var doa=this.state.aDateMM + "/" + this.state.aDateDD + "/" + this.state.aDateYYYY;
    var newCase= {
        id,
        dob,
        doa,
        reasonOfAppoitment: this.state.reasonOfAppoitment,
    }
    API.createCaseToUser(newCase)
    .then(this.setState({ sendingTo: "patient" }))
    .then(res=>{
        //console.log(res.data);
        //console.log(sessionStorage)
    })
    .catch(err => {
        console.log(err)
    })
    
}

render() {
    if (this.state.sendingTo==="patient"){ return <Redirect to="/patient" />}
    return (
        <div className="bg-light">
            <NavbarPatient logout={this.logout}/>
            <div className="row">
                <div className="col d-flex justify-content-center bg-light pt-3">
                    <h3> Date Of Birth: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="number" min="1" max="12" value={this.state.dobMM} onChange={this.handleInputChange} name="dobMM" placeholder="Mount"/>
                </div>
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="number" min="1" max="30" value={this.state.dobDD} onChange={this.handleInputChange} name="dobDD" placeholder="Day"/>
                </div>
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="number" min="1900" max="2019" value={this.state.dobYYYY} onChange={this.handleInputChange} name="dobYYYY" placeholder="Year"/>
                </div>     
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center bg-light">
                    <h3> Requested Appointment Date: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="number" min={this.state.todaysMonth+1} max="12" value={this.state.aDateMM} onChange={this.handleInputChange} name="aDateMM" placeholder="Mount"/>
                </div>
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="number" min={this.state.todaysDay} max="30" value={this.state.aDateDD} onChange={this.handleInputChange} name="aDateDD" placeholder="Day"/>
                </div>
                <div className="col-sm-4 col-md-3 col-lg-3 col-xl-2 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="number" min={this.state.todaysYear} max="2022" value={this.state.aDateYYYY} onChange={this.handleInputChange} name="aDateYYYY" placeholder="Year"/>
                </div>     
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light pt-3">
                    <h3> Reason Of Appointment Request: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 d-inline-flex align-self-center bg-light p-3" >
                    <textarea rows="4" cols="50" className="form-control" type="textBox" value={this.state.reasonOfAppoitment} onChange={this.handleInputChange} name="reasonOfAppoitment" placeholder="I have severe headache" required/>
                </div>     
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light p-3">
                    <button onClick={this.submitCase} style={{ marginBottom: 10 }} className="btn btn-info">
                        Submit
                    </button> 
                </div>
            </div> 
        
        
        </div>

    );
}
};

export default PatientAppointment;