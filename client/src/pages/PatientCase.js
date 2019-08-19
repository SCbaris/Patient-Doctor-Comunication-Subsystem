import React, { Component } from "react";
import {NavbarPinkEmptyPatient} from "../components/Navbar";
import API from "../utils/API";
import { Redirect } from 'react-router-dom'
import MessageBox from "../components/MessageBox";

class PatientCase extends Component {
    state = {
        title:"",
        doctorComment:"",
        medicine:"",
        reasonOfAppoitment:"",

        patientMsg:[],
        doctorMsg:[],
        allMsg:[],
        sendingTo:"",
        newMessage:""
    };

componentDidMount() {
    const token =sessionStorage.getItem('token');
    const patientId =sessionStorage.getItem('id');
    const caseId =sessionStorage.getItem("caseId");

    if(!token || !patientId ) this.setState({ sendingTo: "main" })

    API.getUser(patientId , token)
        .catch(err => {
            this.setState({ sendingTo: "main" })
            console.log(err)
        });

    API.findCaseByIdFromCase(caseId,token)
        .then(res=>{
            //console.log(res.data[0])
            //console.log("Patient Messages : ")
            //console.log(res.data[0].patientMsg)
            //console.log("Doctor Messages : ")
            //console.log(res.data[0].doctorMsg)
            var allMsg=res.data[0].patientMsg;

            for (let i =0 ; i<res.data[0].doctorMsg.length ; i++){
                allMsg.push(res.data[0].doctorMsg[i])
            }

            allMsg.sort(function(a, b) {
                return new Date(a.created) - new Date(b.created);
            });

            //console.log("All Messages sorted : ")
            //console.log(allMsg);
            this.setState({ 
                title:res.data[0].title, 
                doctorComment:res.data[0].doctorComment, 
                medicine:res.data[0].medicine, 
                patientMsg:res.data[0].patientMsg,
                doctorMsg:res.data[0].doctorMsg,
                allMsg:allMsg,
                reasonOfAppoitment:res.data[0].reasonOfAppoitment
             })
        
        })
};

handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};

logout = () => {
    sessionStorage.clear();
};

sendMessage = event => {
    event.preventDefault();
    const token =sessionStorage.getItem('token');
    const patientId =sessionStorage.getItem('id');
    const caseId =sessionStorage.getItem("caseId");

    API.addPatientMessage(caseId, this.state.newMessage , token)
        .then(window.location.reload())
        //.then(res=>console.log(res.data))
        .catch(err => console.log(err))

}

render() {
    if (this.state.sendingTo==="main"){ return <Redirect to="/" />}
    
    return (
        <div className="bg-light">
            <NavbarPinkEmptyPatient logout={this.logout}/>

            <div className="titleGeneralBox bg-light border-bottom">
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> Title </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <p> {this.state.title} </p>
                    </div>   
                </div>
            </div>

            <div className="reasonOfAppointmentBox bg-light border-bottom">
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> Your reason of appointment </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3">
                        <p> {this.state.reasonOfAppoitment}   </p>
                    </div>   
                </div>
            </div>


            <div className="doctorCommentGeneralBox bg-light border-bottom" >
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> Your Comment <br></br> <p>(Patient can see this comment)</p> </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <p> {this.state.doctorComment}  </p>
                    </div>   
                </div>
            </div>

            <div className="medicineGeneralBox bg-light border-bottom">
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> Medicine </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <p> {this.state.medicine}  </p>
                    </div>   
                </div>
            </div>
            <div className="row p-2 bg-secondary d-flex flex-column">
                {this.state.allMsg.map( msg => (
                    <MessageBox
                        key={msg._id}
                        id={msg._id}
                        patientMessage={msg.patientMessage}
                        doctorMessage={msg.doctorMessage}
                        whoSend={msg.whoSend}
                />
                ))}
                <div className="row mt-3 ml-5 mr-5">
                    <div className="col-10">
                        <textarea rows="2" cols="5" className="form-control" type="textBox" value={this.state.newMessage} onChange={this.handleInputChange} name="newMessage" placeholder=""/>
                    </div>
                    <div className="col-2">
                    <button class="btn btn-primary" type="button" onClick={this.sendMessage}>
                            Send
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    );
}
};

export default PatientCase;