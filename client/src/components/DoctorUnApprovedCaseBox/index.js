import React from "react";

function DoctorUnApprovedCaseBox(props) { // this part will take book datas and show on the page.
    return (
        <div className="row border p-2 mb-1 bg-info text-white" id={props.id}>
          <div className="col-md-8 border-right">
            <span>{props.reasonOfAppoitment} </span>
          </div>
          <div className="col-md-3 border-right d-flex align-items-center justify-content-center">
            <span>{props.doa} </span>
          </div>
          <button key={props.id} type="button" onClick={() => props.approveCase(props.id)} className="col-md-1 btn btn-info align-items-center justify-content-center">
              Approve
          </button> 
        </div>
    );
}

export default DoctorUnApprovedCaseBox;