import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux';

import './message.scss'
const Message = forwardRef(({ message: { name, image, timestamp, text, userId } }, ref) => {

    console.log(image);
    const auth = useSelector(state => state.auth)
    const formatTime = () => {
        var d = new Date(timestamp?.seconds * 1000)
        var dateString = d.getDate() + "-" + (d.getMonth() + 1) + " " +
            d.getHours() + ":" + d.getMinutes();
        return dateString;
    }
    const time = formatTime()

    return (

        <div className={auth.userId === userId ? 'message messageByUser' : 'message'} ref={ref}>
            <img src={image} alt="" />
            <div className="message__info">
                <div className="message__header">
                    <span>{name}</span>
                    <span className="ml-2">{time}</span>
                </div>
                <p className="message__body">
                    {text}
                </p>
            </div>
        </div>

    )
})

export default Message