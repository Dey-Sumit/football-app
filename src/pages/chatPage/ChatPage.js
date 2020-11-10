import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import ScrollToBottom from 'react-scroll-to-bottom'

import FlipMove from 'react-flip-move';
import Message from '../../components/message/Message'
import './chatPage.scss'
import { db } from '../../firebase/firebase'
import Navbar from '../../components/navbar/Navbar'
import { MdSend } from "react-icons/md";
import SkeletonCard from '../../components/skeletons/SkeletonCard'


const ChatPage = () => {

    const profile = useSelector(state => state.auth.profile)
    const userId = useSelector(state => state.auth.userId)

    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        db.collection('globalChat').orderBy('timestamp', 'asc')
            .onSnapshot(snapshot =>
                setMessages(snapshot.docs.map(doc => doc.data())))

    }, [])
    // console.log(messages);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.length === 0)
            return
        const data = {
            image: profile.team.logo,
            name: profile.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            text,
            userId
        }
        db.collection('globalChat').add(data)
        setText('')
    }

    return (
        <div className="chatPage">

            <ScrollToBottom className="chatBox">
                {
                    messages.length > 0 ?
                        <FlipMove>
                            {messages.map((message, i) =>
                                <Message key={i} message={message} />
                            )}
                        </FlipMove>
                        : <>
                            <SkeletonCard width={`40%`} height={55} count={2}
                                style={{ 'margin': '0.3rem', 'display': 'block' }} />
                            <SkeletonCard width={`40%`} height={55} count={1}
                                style={{ 'margin': '0.3rem 0.3rem 0.3rem auto', 'display': 'block' }} />
                            <SkeletonCard width={`40%`} height={55} count={3}
                                style={{ 'margin': '0.3rem', 'display': 'block' }} />
                            <SkeletonCard width={`40%`} height={55} count={2}
                                style={{ 'margin': '0.3rem 0.3rem 0.3rem auto', 'display': 'block' }} />

                        </>
                }

            </ScrollToBottom>


            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}
                    placeholder="chat with the fans..."
                />
                <button type='submit'><MdSend size={40} /></button>
            </form>
            <Navbar />
        </div>
    )
}

export default ChatPage
