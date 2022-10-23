import React from "react";

const UiUpdate = (props) => {
    const { sentMessages, userName, userIMG } = props;

    return (
        <div className="generatedMessageBox">
            {sentMessages.map((ReceivedMessage) => {
                return <div className="generatedMessage">
                        <div className="msgContentHolder">
                            <div className="msgContent">
                                {ReceivedMessage.text}
                            </div>
                            <div className="msgBoxName">
                                {userName}
                                <img className='userIMG' src= {userIMG}></img>
                            </div>
                        </div>
                    </div>
                })}
        </div>
    );
};

export default UiUpdate;