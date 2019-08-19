import React, { Component } from "react";
import {NavbarPinkEmpty} from "../components/Navbar";
import { Redirect } from 'react-router-dom'
import API from "../utils/API";

class Signin extends Component {
    state = {
        user:[],
        name:"",
        phone:"",
        email : "",
        gender:"",
        password : "",
        sendingTo:"",
        error:false,

    };

handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};

validateEmail=(email)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    // if email address is avaible to use, they send true.
}
validatePhone=(phone)=> {
    var re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    return re.test(String(phone));
    // if phonenumber is avaible to use, they send true.
    //nnn-nnn-nnnn is ok, nnnnnnnnnn is ok, nnn-nnn-nn-nn is NOT ok.
}


submitSignin = event => {
    event.preventDefault();
    //console.log("Phone number is : " + this.validatePhone(this.state.phone))
    //console.log("Email adress is : " + this.validateEmail(this.state.email))
   if(this.validatePhone(this.state.phone) && this.validateEmail(this.state.email) && this.state.name && this.state.gender && this.state.password){
    var newUser= {
        name : this.state.name,
        phone : this.state.phone,
        email: this.state.email,
        gender: this.state.gender,
        password: this.state.password
    }
    //console.log("new User");
    //console.log(newUser);
    API.signIn(newUser)
    .then(res=>{
        //console.log(res);
        if(res.data.error===false){
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('spec', res.data.user.spec)
            sessionStorage.setItem('id', res.data.user.id)
            //console.log(res);
            if(res.data.user.spec==="patient") this.setState({ sendingTo: "patient" })
            else if(res.data.user.spec==="doctor") this.setState({sendingTo : "doctor"})
        } else if(res.error === true) this.setState({ error: res.error })
    })
   }else this.setState({ error: true })
}

render() {
    var errBox="col d-none justify-content-center bg-danger text-white pt-3";
    if (this.state.sendingTo==="patient"){ return <Redirect to="/patient" />}
    else if (this.state.sendingTo==="doctor"){ return <Redirect to="/doctor" />}
    if (this.state.error === true) errBox="col d-flex justify-content-center bg-danger text-white pt-3";
    
    return (
        <div className="bg-light">
            <NavbarPinkEmpty/>
            <div className="row">
                <div className={errBox}>
                    <h3> There is something wrong! </h3>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center bg-light pt-3">
                    <h3> Name: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="text" value={this.state.name} onChange={this.handleInputChange} name="name" placeholder="John Smith" required/>
                </div>     
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light pt-3">
                    <h3> Phone: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={this.state.phone} onChange={this.handleInputChange} name="phone" placeholder="333-222-1111" required/>
                </div>     
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light pt-3">
                    <h3> Email: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 d-inline-flex align-self-center bg-light p-3" >
                    <input className="form-control" type="email" value={this.state.email} onChange={this.handleInputChange} name="email" placeholder="johnsmith@exp.com" required/>
                </div>     
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light">
                    <h3> Gender: </h3>
                </div>
            </div>
            <div className="row">
                <div className="col d-inline-flex justify-content-center align-self-center bg-light p-3">
                    <div className ="input-group-text">
                        <input type="radio" name="gender" onChange={this.handleInputChange} value="Male"/>
                        <label>Male</label>
                    </div>
                    <div  className ="input-group-text">
                        <input type="radio" name="gender" onChange={this.handleInputChange} value="Female"/>
                        <label >Female</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col d-flex justify-content-center bg-light">
                    <h3> Password: </h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 d-inline-flex align-self-center bg-light p-3">
                    <input className="form-control" type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="*****" required/>
                </div>
            </div>


            <div className="row">
                <div className="col d-flex justify-content-center bg-light p-3">
                    <button onClick={this.submitSignin} style={{ marginBottom: 10 }} className="btn btn-info">
                        Submit
                    </button> 
                </div>
            </div> 
        </div>
    );
}
};

export default Signin;