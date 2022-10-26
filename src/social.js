import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import React from "react";
import { db } from './firebase';

export const UserListGeneration = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection('Friends').get().then((querySnapshot) => {
            const collection = [];
            querySnapshot.forEach((snapshot) => {
                console.log(snapshot.id)
                collection.push(snapshot.id);
            })
            setUsers(collection)
        })
    },[]);

    return(
        <div className="generatedUserContainer">
            {users.map((selectedUser) => {
                return <div className="generatedUser">
                    {selectedUser}
                    <img className="guImg" src={db.collection("Friends").doc(selectedUser).get("ProfilePicture")}></img>
                </div>
            })}
        </div>
    )
}