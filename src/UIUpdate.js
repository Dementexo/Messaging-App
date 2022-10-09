import React from "react";

const UiUpdate = (props) => {
    const { sentMessages } = props;

    return (
        <div className="generatedMessageBox">
            {sentMessages.map((ReceivedMessage) => {
                return <div className="generatedMessage">{ReceivedMessage.text}</div>;
            })}
        </div>
    );
};

export default UiUpdate;