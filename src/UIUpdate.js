import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";

const UiUpdate = (props) => {
    const { trigger } = props;
    const [pastMessages, setPM] = useState([]);
    useEffect(() => {
        db.collection('Messages').orderBy("Timestamp").get().then((querySnapshot) => {
            const msgCollection = [];

            const unsub = () => querySnapshot.forEach((snapshot) => {
                msgCollection.push({Content: snapshot.get("Content"), SentBy: snapshot.get("SentBy"), PFP: snapshot.get("ProfilePic")});
            })
            setPM(msgCollection);
            unsub();
        })
        
    },[trigger]);
    

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
                            </div>
                        </div>
                 })};
        </div>
    );
};

export default UiUpdate;