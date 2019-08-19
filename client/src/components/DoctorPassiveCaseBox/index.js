import React from "react";
import "./style.css";

function DoctorPassiveCaseBox(props) {
    // transperant unseen bulb https://www.beetboost.com/wp-content/uploads/2018/12/light-bulb-png-15-light-bulb-icon-256.png
    var titleSectionText;
    var titleSectionClassName;
    var doaSectionClassName;
    var openSectionClassName;
    var activitySectionClassName;
    var seenSectionPClassName;
    var seenSectionClassName;
    var seenSectionText;
    if(!props.title) titleSectionText=props.reasonOfAppoitment
    else titleSectionText=props.title

    if(props.seen===false) {
        seenSectionText="New Message!";
        seenSectionPClassName="blinkingPassive text-center";

        titleSectionClassName="col-md-6 d-flex border-right align-items-center justify-content-center p-2";
        doaSectionClassName="col-md-2 border-right d-flex align-items-center justify-content-center";
        openSectionClassName="col-md-2 border-right btn btn-warning align-items-center justify-content-center";
        activitySectionClassName="col-md-1 border-right btn btn-warning align-items-center justify-content-center"
        seenSectionClassName="col-md-1 d-flex align-items-center justify-content-center";


    }else {

        titleSectionClassName="col-md-6 d-flex border-right align-items-center justify-content-center p-2";
        doaSectionClassName="col-md-2 border-right d-flex align-items-center justify-content-center";
        openSectionClassName="col-md-2 border-right btn btn-warning align-items-center justify-content-center";
        activitySectionClassName="col-md-2 btn btn-warning align-items-center justify-content-center"
        seenSectionClassName="d-none";
    }

    return (
        <div className="row border p-2 mb-1 bg-warning text-dark" id={props.id}>
          <div className={titleSectionClassName}>
            <p className="m-2">{titleSectionText}</p>
          </div>
          <div className={doaSectionClassName}>
            <span>{props.doa} </span>
          </div>
          <button key={props.id} type="button" onClick={() => props.openCase(props.id)} className={openSectionClassName}>
                Open
          </button>
          <button key={props.id} type="button" onClick={() => props.changeActivity(props.id, props.caseAct)} className={activitySectionClassName}>
                Make Active
          </button>
          <div className={seenSectionClassName}>
            <span className={seenSectionPClassName}>{seenSectionText} </span>
          </div>
        </div>
    );
}

export default DoctorPassiveCaseBox;