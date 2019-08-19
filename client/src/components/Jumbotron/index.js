import React from "react";
import "./style.css";

export function JumbotronDoctor(props) {
  return (
    <div className="jumbotron text-center bg-info text-white">
      <h1>Good Day</h1>
      <p>{props.titleOfDoctor} {props.name}</p>
    </div>
  );
}

export function JumbotronPatient(props) {
  var JumbotronStyles = {
    color:'white',
    backgroundColor:'#dd095e',
  };
  var titleOfPatient;
  if(props.gender==="Male") titleOfPatient="Mr."
  else titleOfPatient="Mrs."
  return (
    <div className="jumbotron text-center" style={JumbotronStyles}>
      <h1>Good Day</h1>
      <p>{titleOfPatient} {props.name}</p>
    </div>
  );
}



