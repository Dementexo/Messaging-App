import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";

export const UiUpdate = (props) => {
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
    
    if (pastMessages == ""){
        return <div className="nmIndicatorHolder">
            <img className="nmImg" src={require("./Images/no-speak.png")}></img>
            <div className="nmSubtext">
                Currently no messages!
            </div>
            <div className="nmSubtext2">
                No need to refresh, this will disappear once message is received or sent.
            </div>
        </div>
    }
    else{
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
                     })}
            </div>
        ); 
    }
};

export const ImgCredits = (props) => {
    let {trigger} = props;
    
    if (trigger === true){
        return <div className="imgCredits">
        Be sure to check out these amazing photos!
        <div className="icContentBox">
            <div className="photoCreds">
                <img className="pcImg" src={require("./Images/profile.png")}></img>
                By Freepik
                <a className="ancHold" href="https://www.flaticon.com/free-icon/profile_3135715?term=profile&page=1&position=2&page=1&position=2&related_id=3135715&origin=search">
                    <img className="linkImg" src={require("./Images/link.png")}></img>
                </a>
            </div>
            <div className="photoCreds">     
                <img className="pcImg" src={require("./Images/face.png")}></img>
                By surang
                <a className="ancHold" href="https://www.flaticon.com/free-icon/face_5071156?term=photo&page=1&position=2&page=1&position=2&related_id=5071156&origin=search">
                    <img className="linkImg" src={require("./Images/link.png")}></img>
                </a>
            </div>
            <div className="photoCreds">
                <img className="pcImg" src={require("./Images/send-message.png")}></img>
                By onlyhasbi
                <a className="ancHold" href="https://www.flaticon.com/free-icon/send-message_3682321?term=send&page=1&position=1&page=1&position=1&related_id=3682321&origin=search">
                    <img className="linkImg" src={require("./Images/link.png")}></img>
                </a>
            </div>
            <div className="photoCreds">
                <img className="pcImg" src={require("./Images/info.png")}></img>
                By Freepik
                <a className="ancHold" href="https://www.flaticon.com/free-icon/info_4014943?term=info&page=1&position=18&page=1&position=18&related_id=4014943&origin=search">
                    <img className="linkImg" src={require("./Images/link.png")}></img>
                </a>
            </div>
        </div>
    </div>
    } 
}