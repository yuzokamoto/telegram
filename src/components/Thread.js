import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import Message from './Message'
import { selectUser } from '../features/userSlice'
import { selectThreadId, selectThreadName } from '../features/threadSlice'
import db from '../firebase'
import { Avatar, IconButton } from '@material-ui/core'
import { MoreHoriz, TimerOutlined, SendRounded, MicNoneOutlined } from '@material-ui/icons'
import './Thread.css'

const Thread = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const threadName = useSelector(selectThreadName);
    const threadId = useSelector(selectThreadId);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (threadId) {
            db.collection('threads')
                .doc(threadId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => 
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    ))
        }
    }, [threadId])

    const sendMessage = async (event) => {
        event.preventDefault();
        
        await db.collection('threads').doc(threadId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        });

        setInput("");
    }

    return (
        <div className="thread">
            <div className="thread__header">
                <div className="thread__header__contents">
                    <Avatar />
                    <div className="thread__header__contents__info">
                        <h4>{threadName}</h4>
                        <h5>Last seen</h5>
                    </div>
                </div>

                <IconButton>
                    <MoreHoriz className="thread__header__details" />
                </IconButton>
            </div>

            <div className="thread__messages">
                {messages.map(({id, data}) => (
                    <Message key={id} data={data} />
                ))}
            </div>

            <div className="thread__input" >
                <form onSubmit={sendMessage}>
                    <input placeholder="Write a message..." type="text" value={input || ""} onChange={(event) => setInput(event.target.value)}/>
                    
                    <IconButton>
                        <TimerOutlined />
                    </IconButton>
                    
                    <IconButton onClick={sendMessage}>
                        <SendRounded />
                    </IconButton>

                    <IconButton>
                        <MicNoneOutlined />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Thread
