import React from "react";

const uiUpdate = (props) => {
    const { sentMessages } = props;

    return (
        <ul>
            {sentMessages.map((sentMessages) => {
                return <li key={sentMessages.id}>{sentMessages.text}</li>;
            })}
        </ul>
    );
};

export default uiUpdate;