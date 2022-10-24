import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import React from "react";
import { db } from './firebase';

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
    const [authCheck, setAuthCheck] = useState();

    const permDelete = () => {
        db.collection("Messages").get().then(querySnapshot => {
            querySnapshot.docs.forEach(snapshot => {
                if(snapshot != "Anchor"){
                    snapshot.ref.delete();
                }
            })
        })
      }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user.uid === "buTtOeXKF5Rx4BNZQ1FeKrvhfUC3" || user.uid === "FhT41FpMc9NplSsG8nLuGqYLkSd2") {
                console.log("Authentication successful!");
                setAuthCheck(true)
            }
            else {  
                console.log("Authentication Failed!")
                setAuthCheck(false);
            }
        });
    });

    if(authCheck === true){
        return(
            <div className="hiddenDelete" onClick={permDelete}>
                <img className="adminDeleteIcon" src={require("./Images/delete.png")} alt='Delete'></img>
            </div>
        )
    }
    else {
        return(
            <div className="hiddenDelete">
                <img className="adminDeleteIcon" src={require("./Images/info.png")} alt='Info'></img>
            </div>
        )
    }
};