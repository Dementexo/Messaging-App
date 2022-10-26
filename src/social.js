import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import React from "react";
import { db } from './firebase';

export const UserListGeneration = () => {

    const [users, setUsers] = useState([]);
    const [profileURL, setProfileURL] = useState([]);

    useEffect(() => {
        db.collection('Friends').get().then((querySnapshot) => {
            const collection = [];
            const collection2 = [];

            querySnapshot.forEach((snapshot) => {
                collection.push(snapshot.id);
                collection2.push(snapshot.get("ProfilePicture"));
            })
            setUsers(collection);
            setProfileURL(collection2);
            console.log(collection2);
        })
    },[]);

    return(
        <div className="generatedUserContainer">
            <div className="photoColumn">
                {profileURL.map((selectedURL) => {
                    return <div className="guImgHolder"> 
                        <img className="guImg" src={selectedURL}></img>
                    </div>
                })}
            </div>
            <div className="userColumn">
                {users.map((selectedUser) => {
                    return <div className="generatedUser">
                        {selectedUser}
                    </div>
                })}
            </div>
        </div>
    )
}

export const HistGeneration = () => {
    const [pastMessages, setPM] = useState([]);

    useEffect(() => {
        db.collection('Messages').get().then((querySnapshot) => {
            const msgCollection = [];

            querySnapshot.forEach((snapshot) => {
                msgCollection.push(snapshot.get("Content"));
            })
            setPM(msgCollection);
            console.log(msgCollection);
        })
    },[]);

    return(
        <div className="generatedHistoryBox">
            {pastMessages.map((selectedMessage) => {
                        return <div className="generatedHistMessage"> 
                            <div className="hMsgContentHolder">
                                <div className="hMsgContent">
                                    {selectedMessage}
                                </div>
                            </div>
                        </div>
                 })}
        </div>
    )
}