import React from 'react';

const Notification = ({ message }) => {
    console.log("notify");
    return (
        <div>
            {message}
        </div>
    );
};

export default Notification;