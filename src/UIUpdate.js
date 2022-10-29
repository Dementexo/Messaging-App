import React from "react";
import { HistGeneration } from "./social";
import { useState, useEffect } from "react";
import { db } from "./firebase";

const UiUpdate = (props) => {
    const { sentMessages, userName, userIMG } = props;
    const [pastMessages, setPM] = useState([]);

    useEffect(() => {
        db.collection('Messages').orderBy("Timestamp").get().then((querySnapshot) => {
            const msgCollection = [];

            querySnapshot.forEach((snapshot) => {
                msgCollection.push(snapshot.get("Content"));
            })
            setPM(msgCollection);
            console.log(msgCollection);
        })
    },[sentMessages]);

    return (
        <div className="generatedMessageBox">
            {pastMessages.map((selectedMessage) => {
                        return <div className="generatedMessage"> 
                            <div className="msgContentHolder">
                                <div className="msgContent">
                                    {selectedMessage}
                                </div>
                                <div className="msgBoxName">
                                    {userName}
                                    <img className='userIMG' src={userIMG}></img>
                                </div>
                            </div>
                        </div>
                 })};
        </div>
    );
};

export default UiUpdate;