import React from "react";

const UiUpdate = (props) => {
    const { sentMessages, userName } = props;

    return (
        <div className="generatedMessageBox">
            {sentMessages.map((ReceivedMessage) => {
                return <div className="generatedMessage">
                    {ReceivedMessage.text}<div className="msgBoxName">{userName}</div></div>;
            })}
        </div>
    );
};

export default UiUpdate;