import React from "react";

function MessageBox(props) {
  const spec =sessionStorage.getItem('spec');
  var boxClassName="";
  var generalBoxClassName="";
  var message="";
  if(spec==="doctor"){
    if(props.whoSend==="doctor"){ 
      generalBoxClassName="row p-2 bg-light d-flex justify-content-end mr-5 ml-5"
      boxClassName="p-3 col-4 bg-info text-white rounded mr-4"
      message=props.doctorMessage;
    }
    else if(props.whoSend==="patient") {
      generalBoxClassName="row p-2 bg-light d-flex justify-content-start mr-5 ml-5"
      boxClassName="p-3 col-4 bg-danger text-white d-flex rounded ml-4"
      message=props.patientMessage;
    }
  }
  else if(spec==="patient"){
    if(props.whoSend==="doctor") {
      generalBoxClassName="row p-2 bg-light d-flex justify-content-start mr-5 ml-5"
      boxClassName="p-3 col-4 bg-info text-white rounded mr-4"
      message=props.doctorMessage;
    }
    else if(props.whoSend==="patient") {
      generalBoxClassName="row p-2 bg-light d-flex justify-content-end mr-5 ml-5"
      boxClassName="p-3 col-4 bg-danger text-white d-flex rounded ml-4"
      message=props.patientMessage;    
    }
  }
    return (
        <div className={generalBoxClassName} id={props.id}>
          <div className={boxClassName}>
            <p className="align-self-center m-1">{message}</p>
          </div>      
        </div>
    );
}

export default MessageBox;