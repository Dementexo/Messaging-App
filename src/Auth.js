import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import React from "react";
import { unmountComponentAtNode } from "react-dom";

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

export const UnUpdate = () => {
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                setCurrUser(user.displayName);
                console.log(currUser);
            }
            else {
                setCurrUser("Stranger");
            }
        });
    });

    return (
        <div className="unHolder">
            { "Welcome, " + currUser + "!" }
        </div>
    );
};

export const AdminClear = () => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user.uid == "buTtOeXKF5Rx4BNZQ1FeKrvhfUC3") {
                console.log("Authentication successful!")
            }
            else {  
                console.log("Authentication Failed!")
                unmountComponentAtNode(document.getElementsByClassName("App"));
            }
        });
    });

    return(
        <div className="hiddenDelete">
            over here!
        </div>
    )
};