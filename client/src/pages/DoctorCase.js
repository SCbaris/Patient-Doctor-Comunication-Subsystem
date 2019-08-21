import React, { Component } from "react";
import {NavbarBlueEmpty} from "../components/Navbar";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import MessageBox from "../components/MessageBox";



class DoctorCase extends Component {
    state = {
        oldTitle:"", // old values came from db. 
        oldDoctorHideComment:"", // to show to doctor.
        oldDoctorComment:"", 
        oldMedicine:"",
        reasonOfAppoitment:"", 

        title:"", // normal values will change in every input.
        doctorHideComment:"", // and will change db value after submit.
        doctorComment:"",
        medicine:"",

        patientMsg:[],
        doctorMsg:[],
        allMsg:[],
        sendingTo:"",
        newMessage:"",

        userEmail:"",
    };



componentDidMount() {
    
    const token =sessionStorage.getItem('token');
    const doctorId =sessionStorage.getItem('id');
    const caseId =sessionStorage.getItem("caseId");
    const spec=sessionStorage.getItem("spec");
    
    if(!token || !doctorId ) this.setState({ sendingTo: "main" })

    API.getUser(doctorId , token)
        .then(res => {if(!res.data.name || !res.data.email || !res.data.title) return this.setState({ sendingTo: "main" })})
        .catch(err => {
        this.setState({ sendingTo: "main" })
        console.log(err)
        });

    API.findUserByIdFromCase(caseId ,spec,  token)
        .then(res => {
            //console.log("findUserByIdFromCase start")
            //console.log("your user is :")
            //console.log(res.data);
            this.setState({
                userEmail:res.data.email
             })
        })
    

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
                oldTitle:res.data[0].title, 
                oldDoctorHideComment:res.data[0].doctorHideComment, 
                oldDoctorComment:res.data[0].doctorComment, 
                oldMedicine:res.data[0].medicine, 
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
}


submitComment = event => {
    event.preventDefault();
    const token =sessionStorage.getItem('token');
    const doctorId =sessionStorage.getItem('id');
    const caseId =sessionStorage.getItem("caseId");
    

    var newComment= {
        title: this.state.title,
        doctorHideComment: this.state.doctorHideComment,
        doctorComment: this.state.doctorComment,
        medicine: this.state.medicine
    }


    API.addDoctorComment(caseId,newComment,token)
        .then(window.location.reload())
        //.then(res=> console.log(res.data))
        .catch(err => console.log(err))
    
}

sendMessage = event => {
    event.preventDefault();

    const token =sessionStorage.getItem('token');
    const doctorId =sessionStorage.getItem('id');
    const caseId =sessionStorage.getItem("caseId");
    const spec=sessionStorage.getItem("spec");

    API.addDoctorMessage(caseId, this.state.newMessage , token)
        .then(()=>{
            API.sendMail(this.state.newMessage,this.state.userEmail,spec)
                .catch(err =>console.log(err))
            window.location.reload()
        })
        //.then(res=>console.log(res.data))
        .catch(err => console.log(err))
    

}


render() {
    if (this.state.sendingTo==="main"){ return <Redirect to="/" />}
    return (
        <div className="bg-light">
            <NavbarBlueEmpty logout={this.logout}/>

            <div className="titleGeneralBox bg-light border-bottom">
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> Title </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <p> {this.state.oldTitle} </p>
                    </div>   
                </div>
                <div className="row justify-content-center mb-3">
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#titleCollapse" aria-expanded="false" aria-controls="titleCollapse">
                        Edit Title
                    </button>
                </div>
                <div className="row justify-content-center collapse" id="titleCollapse">
                    <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 d-inline-flex align-self-center bg-light p-3" >
                        <textarea rows="2" cols="5" className="form-control" type="textBox" value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Edit Title of this Case."/>
                        <button class="btn btn-primary ml-2" type="button" onClick={this.submitComment}>
                            Submit
                        </button>
                    </div>   
                </div>
            </div>

            <div className="reasonOfAppointmentBox bg-light border-bottom">
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> The Patient's reason of appointment </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3">
                        <p> {this.state.reasonOfAppoitment}   </p>
                    </div>   
                </div>
            </div>

            <div className="doctorHideCommentGeneralBox bg-light border-bottom">
                <div className="row justify-content-center">
                    <div className="col-6 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <h3> Your Private Comment </h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 mb-2 d-flex justify-content-center bg-light pt-3 border-bottom">
                        <p> {this.state.oldDoctorHideComment}   </p>
                    </div>   
                </div>
                <div className="row justify-content-center mb-3">
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#hideCommentCollapse" aria-expanded="false" aria-controls="hideCommentCollapse">
                        Edit Your Comment
                    </button>
                </div>
                <div className="row justify-content-center collapse" id="hideCommentCollapse">
                    <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 d-inline-flex align-self-center bg-light p-3" >
                        <textarea rows="2" cols="5" className="form-control" type="textBox" value={this.state.doctorHideComment} onChange={this.handleInputChange} name="doctorHideComment" placeholder="Edit your personal comment."/>
                        <button class="btn btn-primary ml-2" type="button" onClick={this.submitComment}>
                            Submit
                        </button>                    
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
                        <p> {this.state.oldDoctorComment}  </p>
                    </div>   
                </div>

                <div className="row justify-content-center mb-3">
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#commentCollapse" aria-expanded="false" aria-controls="commentCollapse">
                        Edit Comment
                    </button>
                </div>
                
                <div className="row justify-content-center collapse" id="commentCollapse">
                    <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 d-inline-flex align-self-center bg-light p-3" >
                        <textarea rows="2" cols="5" className="form-control" type="textBox" value={this.state.doctorComment} onChange={this.handleInputChange} name="doctorComment" placeholder="Edit your comment. The patient will see this comment."/>
                        <button class="btn btn-primary ml-2" type="button" onClick={this.submitComment}>
                            Submit
                        </button>     
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
                        <p> {this.state.oldMedicine}  </p>
                    </div>   
                </div>
                <div className="row justify-content-center mb-3">
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#medicineCollapse" aria-expanded="false" aria-controls="medicineCollapse">
                        Edit Medicine
                    </button>
                </div>
                <div className="row justify-content-center collapse" id="medicineCollapse">
                    <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 d-inline-flex align-self-center bg-light p-3" >
                        <textarea rows="2" cols="5" className="form-control" type="textBox" value={this.state.medicine} onChange={this.handleInputChange} name="medicine" placeholder="Which medicines the patient use?"/>
                        <button class="btn btn-primary ml-2" type="button" onClick={this.submitComment}>
                            Submit
                        </button> 
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

export default DoctorCase;