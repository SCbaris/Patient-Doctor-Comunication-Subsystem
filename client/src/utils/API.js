import axios from "axios";

export default { 
  logIn: function(info) { 
    console.log("Login start");
    //console.log("Your info : " + info);
    return axios.post("/api/auth", info); 
  },
  signIn: function(info) { 
    console.log("Signin start");
    //console.log("Your info : ");
    //console.log(info);
    return axios.post("/api/users", info); 
  },
  getUser: function(id , token) {
    console.log("Geting user start");
    //console.log("Your id : " + id);
    return axios.get("/api/auth/" + id ,{
      headers: {'Content-Type': 'application/json',
                'x-auth-token': token,}
      });
  },
  createCaseToUser: function(info) {
    console.log("Creating Case to User Start");
    //console.log("Your info : ");
    //console.log(info);
    return axios.post("/api/case", info); 
  },
  findCaseByIdFromUser: (id , token) =>{
    console.log("Geting cases that associated id start");
    //console.log("Your id : " + id);
    return axios.get("api/case/user/" + id ,{
      headers: {'Content-Type': 'application/json',
                'x-auth-token': token,}
      });
  },
  findCaseByIdFromCase: (caseId , token) =>{
    console.log("Geting cases that from case Id");
    //console.log("Case id : " + caseId);
    return axios.get("api/case/" + caseId ,{
      headers: {'Content-Type': 'application/json',
                'x-auth-token': token,}
      });
  },
  removeCaseById: (id, token) => { // This function is for patient.
                                   // If the patient want to delete an appointment request,
                                   // They can click "Cancel appointment" or "Cross(X)" and remove their case.
                                   // if the case is already approved they cannot reach these function. (Will added to backend).
    console.log("Delete case start");
    //console.log("Your id : " + id);
    return axios.get("api/case/delete/" + id ,{
      headers: {'Content-Type': 'application/json',
                'x-auth-token': token,}
      });
  },
  signInAsDoctor: function(info) { // This part is only for external. 
                                   // I use "postman" to create doctor profile.
                                   // Theoreticaly Doctors cannot signin themself.
                                   // Admin or database manager suppose to add them.
                                   // And postman is a good tool to use for this purpose.
    console.log("Doctor Signin start");
    //console.log("Your info : ");
    //console.log(info);
    return axios.post("/api/doctor", info); 
  }, 
  getAllUnapprovedCases: (token) => { // This function is for only doctors.
                                      // It need token to use. Because patient cases will return
                                      // This information is private and special.
                                      // Use this function only for the doctor page and releted pages.
                                      //!!! This is different then findCaseByIdFromUser BECAUSE it will take all case
                                      //!!! those unapprove is false. 
                                      //!!! The case dont have to be associated to doctor.
                                      //!!! findCaseByIdFromUser find cases those associated id that sended.
    console.log("Getting All Cases Start");
    return axios.get("api/doctor/unapprovedcases" ,{
      headers: {'Content-Type': 'application/json',
                'x-auth-token': token,}
      });
  },
  approveCase: (doctorId ,id , token) => { // This function is for doctors.
                                           // Doctors can reach this function only. (will added on backend)
                                           // Doctors see all unApproved cases when getin their page.
                                           // And they can click approve button, they can take this case on them.
                                           // This function associate this case to doctor and change unApproved state.
    console.log("One case approval start");
    return axios({
              method: 'post',
              data: { doctorId: doctorId }, // If we post data like this, backend will get this data
                                            // as req.body.doctorId
              url: "api/doctor/approve/" + id , // this id is case id. (req.params.id)
              headers: {'Content-Type': 'application/json',
                'x-auth-token': token,} // All case operation (exept creation) need auth.
                                        // beacuse of privacy.
    })
  },
  addDoctorMessage:(caseId, doctorMessage, token) => { // This function is essential for "comination function"
                                                       // Doctors can send message on their case page.
                                                       // After sending a message this message will be pushed
                                                       // case.msg.doctorMsg array. This array has "seen" and created date.
                                                       // Associated Doctor and Patient can see this messages.  
    
    //console.log("Doctor send a message :")
    //console.log(doctorMessage);

    //console.log("Doctor Send message to this case ID : ")
    //console.log(caseId);

    return axios({
      method: 'post',
      data: { doctorMessage: doctorMessage }, // req.body.doctorMessage
      url: "api/case/doctor/message/" + caseId ,
      headers: {'Content-Type': 'application/json',
        'x-auth-token': token,}
    })
  },
  addPatientMessage:(caseId, patientMessage,token) => { // This function is similar to addDoctorMessage function.
                                                        // Will add an patient message to case collection.
    //console.log("Patient send a message :")
    //console.log(patientMessage);

    //console.log("Patient Send message to this case ID : ")
    //console.log(caseId);

    return axios({
      method: 'post',
      data: { patientMessage: patientMessage }, // req.body.patientMessage
      url: "api/case/patient/message/" + caseId ,
      headers: {'Content-Type': 'application/json',
        'x-auth-token': token,}
    })
  },
  addDoctorComment:(caseId, doctorComment, token) => { // Case collection has some special documents.
                                                       // doctorHideComment , doctorComment, medicine ,title
                                                       // Patient can see only doctorComment and title.
                                                       // But doctor can add some special note to himself.
                                                       // Such as patient cure history etc.
                                                       // Kind a reminder.
                                                       // Also doctor can write something to patient on doctor comment.
                                                       // Such as "Thanks for visit our hospital. We wish your best. 
                                                       // Dont forget to take your medicine. Dont forget to check every 6 month. Next appointment is mm/dd/yy."

    //console.log("Doctor send a comments :")
    //console.log(doctorComment);

    //console.log("Doctor Send comments to this case ID : ")
    //console.log(caseId);

    return axios({ // Doctor post this datas to collection. 
      method: 'post',
      data: { 
        title: doctorComment.title,
        doctorHideComment: doctorComment.doctorHideComment, // req.body.doctorHideComment
        doctorComment: doctorComment.doctorComment, // req.body.doctorComment
        medicine:doctorComment.medicine // req.body.medicine 
       },
      url: "api/case/doctor/comment/" + caseId ,
      headers: {'Content-Type': 'application/json',
        'x-auth-token': token,}
    })
  },
  changeCaseActivity:(caseId,caseActivity,token) => { // This function help doctor to change case activity.
                                                      // Active case meaning "patient still waiting to visit" or
                                                      // "Treatment still ongoing".
                                                      // If treatment is over or done Doctor can change this activity.
                                                      // caseActivity send as body member. Can be "active" or "passive"

    //console.log("Doctor Change to this case activity ID : ")
    //console.log(caseId);

    return axios({
      method: 'post', 
      data: { caseActivity: caseActivity }, // req.body.caseActivity 
      url: "api/case/doctor/activity/" + caseId ,
      headers: {'Content-Type': 'application/json',
        'x-auth-token': token,}
    })
  },
  changeAllUnseenToSeen:(caseId,userId,spec,token) => { // This function will called on doctor pace.
                                                   // Whenever Doctor or Patient open case page (spesific case), all unseen turn to seen
                                                   // This function help the doctor and patient to see unseen messages.
                                                   // (NOTE: if the case has any unseen messages the indicator blinking.)
    return axios({
      method: 'post', 
      data: { userId: userId,
              spec:spec }, // spec can be doctor or patient
                           // this one come from session storage.
                           // req.body.spec.
      url: "api/case/seen/" + caseId ,
      headers: {'Content-Type': 'application/json',
        'x-auth-token': token,}
    })

  }
};



