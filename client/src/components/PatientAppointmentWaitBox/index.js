import React from "react";

// This component will implement to patient page.
// This box will show unAppoved appointment to the patient. 
// This mean is waiting appointment.

function PatientAppointmentWaitBox(props) { // this part will take book datas and show on the page.
    return (
        <div className="row border p-2 mb-1 bg-secondary text-white" id={props.id}>
          <div className="col-md-8 border-right">
            <span>{props.reasonOfAppoitment} </span>
          </div>
          <div className="col-md-3 border-right d-flex align-items-center justify-content-center">
            <span>{props.doa} </span>
          </div>
          <button key={props.id} type="button" onClick={() => props.deleteCase(props.id)} className="col-md-1 btn btn-secondary align-items-center justify-content-center">
              X
          </button> 
        </div>
    );
}

export default PatientAppointmentWaitBox;
