import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";

const UiUpdate = (props) => {
    const { sentMessages, userName, userIMG} = props;
    const [pastMessages, setPM] = useState([]);

    useEffect(() => {
        db.collection('Messages').orderBy("Timestamp").get().then((querySnapshot) => {
            const msgCollection = [];

            querySnapshot.forEach((snapshot) => {
                msgCollection.push({Content: snapshot.get("Content"), SentBy: snapshot.get("SentBy"), PFP: snapshot.get("ProfilePic")});
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
                                    {selectedMessage.Content}
                                </div>
                                <div className="msgBoxName">
                                    {selectedMessage.SentBy}
                                    <img className='userIMG' src={selectedMessage.PFP}></img>
                                </div>
                                <div className="msgTS">
                                    {selectedMessage.TS}
                                </div>
                            </div>
                        </div>
                 })};
        </div>
    );
};

export default UiUpdate;