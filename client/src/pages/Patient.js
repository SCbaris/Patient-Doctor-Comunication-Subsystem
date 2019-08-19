import React, { Component } from "react";
import {NavbarPatient} from "../components/Navbar";
import API from "../utils/API";
import { JumbotronPatient } from "../components/Jumbotron";
import { Redirect } from 'react-router-dom'
import PatientAppointmentWaitBox from "../components/PatientAppointmentWaitBox"
import PatientApprovedCaseBox from "../components/PatientApprovedCaseBox"

class Patient extends Component {
    state = {
        name:"",
        phone:"",
        email : "",
        gender:"",
        sendingTo:"",
        unApprovedCases: [],
        approvedCases: []
    };

componentDidMount() {
        const token =sessionStorage.getItem('token')
        const id =sessionStorage.getItem('id')

        if(!token || !id ) this.setState({ sendingTo: "main" })
        API.getUser(id , token)
            .then(res => this.setState({
                name : res.data.name,
                phone :res.data.phone,
                email :res.data.email,
                gender :res.data.gender
            })
            )
            .catch(err => {
                this.setState({ sendingTo: "main" })
                console.log(err)
            });

        API.findCaseByIdFromUser(id , token)
            .then(res => {
                 var unApprovedCases =res.data[0].case.filter((oneCase)=> {
                     if (oneCase.unApproved===false) return oneCase
                    });
                  var approvedCases =res.data[0].case.filter((oneCase)=> {
                    if (oneCase.unApproved===true) return oneCase
                    });


                //console.log("Sended unApproved Cases : ");
                //console.log(unApprovedCases)

                //console.log("Sended Approved Cases : ");
                //console.log(approvedCases)
                this.setState({ 
                    unApprovedCases: unApprovedCases,
                    approvedCases: approvedCases,
                 })
            })
            .catch(err => console.log(err));
};

logout = () => {
    sessionStorage.clear();
};

deleteCase = (id) => {
    const token =sessionStorage.getItem('token')
    API.removeCaseById(id , token)
        .then(window.location.reload())
        //.then(res=>{console.log(res.data);})

};

isThereUnseenDoctorMsg = (doctorMsg) => {
    var seen=true;
    doctorMsg.map(msg => {if(msg.seen===false) seen=false})
    return seen;
};

openCase = (caseId) => {
    sessionStorage['caseId'] = caseId;
    this.setState({ sendingTo: "patientCase" })
}

/*handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      
    });
};*/

render() {
    if (this.state.sendingTo==="main"){ return <Redirect to="/" />}
    if (this.state.sendingTo==="patientCase"){ return <Redirect to="/patientcase" />}
    return (
        <div>
            <NavbarPatient logout={this.logout}/>
            <JumbotronPatient
                gender={this.state.gender}
                name={this.state.name}
            />

            <div className="patientUnapprovedCaseBox d-block align-items-center justify-content-center p-2 m-3 bg-light">
                <div className="col-md-12 d-flex align-items-center justify-content-center p-3 mb-2 bg-secondary text-white">
                    <h4>Appointment Requests</h4>
                </div>
                {this.state.unApprovedCases.map( cas => (
                <PatientAppointmentWaitBox 
                    key={cas._id}
                    id={cas._id}
                    doa={cas.doa}
                    reasonOfAppoitment={cas.reasonOfAppoitment}
                    deleteCase={this.deleteCase}
                />
                ))}
            </div>
            <div className="caseGeneralBoxActive d-block align-items-center justify-content-center p-2 m-3 bg-light">
                <div className="col-md-12 d-flex align-items-center justify-content-center p-3 mb-2 bg-success text-white">
                    <h4>Active Cases</h4>
                </div>
                {this.state.approvedCases.map( cas => (
                <PatientApprovedCaseBox
                    key={cas._id}
                    id={cas._id}
                    doa={cas.doa}
                    title={cas.title}
                    seen={this.isThereUnseenDoctorMsg(cas.doctorMsg)}
                    reasonOfAppoitment={cas.reasonOfAppoitment}
                    openCase={this.openCase}

                />
                ))}
            </div>

        </div>
    );
}
};

export default Patient;