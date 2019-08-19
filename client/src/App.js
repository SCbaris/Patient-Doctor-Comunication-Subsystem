import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main"
import Login from "./pages/Login"
import Signin from "./pages/Signin"
import Patient from "./pages/Patient"
import PatientAppointment from "./pages/PatientAppointment"
import PatientCase from "./pages/PatientCase"
import Doctor from "./pages/Doctor"
import DoctorCase from "./pages/DoctorCase"
import MainLocation from "./pages/MainLocation"
import PatientLocation from "./pages/PatientLocation"


function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Main} /> {/*This is fist page.*/}
            <Route exact path="/login" component={Login} /> {/*If client click "Log in", this page will open*/}
            <Route exact path="/signin" component={Signin} /> {/*If client click "New Patient", this page will open*/}
            <Route exact path="/patient" component={Patient} /> {/*If client log in as patient Patient page will open*/}
            <Route exact path="/patient/appointment" component={PatientAppointment} /> {/*If patient click "New Appointment" appointment page open*/}
            <Route exact path="/patientcase" component={PatientCase} /> {/*If patient click, one of our case this will open*/}
            <Route exact path="/doctor" component={Doctor} /> {/*If client log in as doctor, this page will open*/}
            <Route exact path="/doctorcase" component={DoctorCase} /> {/*If doctor click any case, one case will open*/}
            <Route exact path="/main/location" component={MainLocation} /> {/*location page open in main.*/}
            <Route exact path="/patient/location" component={PatientLocation} /> {/*location page open in patient page.*/}
          </Switch>
        </div>
      </Router>
  );
}

export default App;
