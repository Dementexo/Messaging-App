import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import React from "react";
import { db } from './firebase';


export const UserListGeneration = () => {

    const [users, setUsers] = useState([]);
    const [profileURL, setProfileURL] = useState([]);
    const [miniInfo, setMI] = useState([]);
    
    useEffect(() => {
        db.collection('Friends').get().then((querySnapshot) => {
            const collection = [];
            const collection2 = [];
            const collection3 = [];

            querySnapshot.forEach((snapshot) => {
                collection.push(snapshot.id);
                collection2.push(snapshot.get("ProfilePicture"));
                const data = {Name: snapshot.id, PFP: snapshot.get("ProfilePicture")};
                collection3.push(data);
            })
            setUsers(collection);
            setProfileURL(collection2);
            setMI(collection3);
            console.log(miniInfo)
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
                        <div className="holder">
                            {miniInfo.map((data) => {
                                if(data.Name == selectedUser){
                                    return <div className="miniPF">
                                    <div className="mpfPFP">
                                        <img src={data.PFP}></img>
                                    </div>
                                    <div className="mpfName">
                                        {data.Name}
                                    </div>
                                </div>
                                }
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

