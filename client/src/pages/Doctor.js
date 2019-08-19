import React, { Component } from "react";
import {NavbarBlueEmpty} from "../components/Navbar";
import API from "../utils/API";
import { JumbotronDoctor } from "../components/Jumbotron";
import { Redirect } from 'react-router-dom'
import DoctorUnApprovedCaseBox from "../components/DoctorUnApprovedCaseBox"
import DoctorActiveCaseBox from "../components/DoctorActiveCaseBox"
import DoctorPassiveCaseBox from "../components/DoctorPassiveCaseBox"

class Doctor extends Component {
    state = {
        name:"",
        email: "",
        title:"",
        sendingTo:"",
        unApprovedCases: [], // this is all cases without doctor bind.
                             // There aren't any unapprove case with doctor associated
                             // Because after doctor approve cases associate to doctor.
                             // There are 3 type of cases. 
                             // patient --> case(unapprove) // patient --> case(approved)
                             // doctor --> case(approve)  
        approvedCases: [],
        activeCases:[],
        passiveCases:[],
    };

    componentDidMount() {
        const token =sessionStorage.getItem('token');
        const doctorId =sessionStorage.getItem('id');

        if(!token || !doctorId ) this.setState({ sendingTo: "main" })
        API.getUser(doctorId , token)
            .then(res => this.setState({
                name : res.data.name,
                email :res.data.email,
                title :res.data.title
            })
            )
            .catch(err => {
                this.setState({ sendingTo: "main" })
                console.log(err)
            });

        API.getAllUnapprovedCases(token)
            .then(res => {
                var unApprovedCases = res.data
                //console.log(unApprovedCases);
                this.setState({
                    unApprovedCases : unApprovedCases,
                })
                //console.log("All unapproved cases")
                //console.log(this.state.unApprovedCases);
            })

        API.findCaseByIdFromUser(doctorId , token)
            .then(res => { //res.data[0].case is our cases.
                var approvedCases =res.data[0].case.filter((oneCase)=> {
                    if (oneCase.unApproved===true) return oneCase
                });
                var activeCases =res.data[0].case.filter((oneCase)=> {
                    if (oneCase.activity==="active") return oneCase
                });
                var passiveCases =res.data[0].case.filter((oneCase)=> {
                    if (oneCase.activity==="passive") return oneCase
                });
                
                //console.log("Gotten Approved Cases : ");
                //console.log(approvedCases)

                //console.log("Gotten Active Cases : ");
                //console.log(activeCases)

                //console.log("Gotten Pasive Cases : ");
                //console.log(passiveCases)
                
                this.setState({ 
                    approvedCases: approvedCases,
                    activeCases:activeCases,
                    passiveCases:passiveCases
                 })
            })
            .catch(err => console.log(err));
        
    };

    approveCase = (id) => {
        const doctorId =sessionStorage.getItem('id');
        const token =sessionStorage.getItem('token');
        API.approveCase(doctorId , id , token)
            .then(window.location.reload())
            //.then(res=> console.log(res.data))
    };

    changeActivity = (id , caseAct) => {
        const token =sessionStorage.getItem('token');
        if(caseAct==="active") caseAct="passive";
        else caseAct="active";

        API.changeCaseActivity(id , caseAct , token)
            .then(window.location.reload())  
            //.then(res=> console.log(res.data)) 
    };

    isThereUnseenPatientMsg = (patientMsg) => {
        var seen=true;
        patientMsg.map(msg => {if(msg.seen===false) seen=false})
        return seen;
    };

    openCase = (caseId) => {
        sessionStorage['caseId'] = caseId;
        this.setState({ sendingTo: "doctorCase" })
    }



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
    if (this.state.sendingTo==="main"){ return <Redirect to="/" />}
    if (this.state.sendingTo==="doctorCase"){ return <Redirect to="/doctorcase" />}
    return (
        <div>
            <NavbarBlueEmpty logout={this.logout}/>
            <JumbotronDoctor
                    titleOfDoctor={this.state.title}
                    name={this.state.name}
            />
            <div className="appointmentGeneralBox d-block align-items-center justify-content-center p-2 m-3 bg-light">
                <div className="col-md-12 d-flex align-items-center justify-content-center p-3 mb-2 bg-info text-white">
                    <h4>Appointment Requests</h4>
                </div>
                {this.state.unApprovedCases.map( cas => (
                <DoctorUnApprovedCaseBox
                    key={cas._id}
                    id={cas._id}
                    doa={cas.doa}
                    reasonOfAppoitment={cas.reasonOfAppoitment}
                    approveCase={this.approveCase}
                />
                ))}
            </div>
            <div className="caseGeneralBoxActive d-block align-items-center justify-content-center p-2 m-3 bg-light">
                <div className="col-md-12 d-flex align-items-center justify-content-center p-3 mb-2 bg-success text-white">
                    <h4>Active Cases</h4>
                </div>
                {this.state.activeCases.map( cas => (
                <DoctorActiveCaseBox
                    key={cas._id}
                    id={cas._id}
                    doa={cas.doa}
                    title={cas.title}
                    seen={this.isThereUnseenPatientMsg(cas.patientMsg)}
                    reasonOfAppoitment={cas.reasonOfAppoitment}
                    openCase={this.openCase}
                    caseAct={cas.activity}
                    changeActivity={this.changeActivity}

                />
                ))}
            </div>
            <div className="appointmentGeneralBox d-block align-items-center justify-content-center p-2 m-3 bg-light">
                <div className="col-md-12 d-flex align-items-center justify-content-center p-3 mb-2 bg-warning text-dark">
                    <h4>Passive Cases</h4>
                </div>
                {this.state.passiveCases.map( cas => (
                <DoctorPassiveCaseBox
                    key={cas._id}
                    id={cas._id}
                    doa={cas.doa}
                    title={cas.title}
                    seen={this.isThereUnseenPatientMsg(cas.patientMsg)}
                    reasonOfAppoitment={cas.reasonOfAppoitment}
                    openCase={this.openCase}
                    caseAct={cas.activity}
                    changeActivity={this.changeActivity}
                />
                ))}
            </div>
        </div>

    );
}
};

export default Doctor;