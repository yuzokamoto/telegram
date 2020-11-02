import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setThread } from '../features/threadSlice'
import db from '../firebase'
import { Avatar } from '@material-ui/core'
import './SidebarThread.css'

const SidebarThread = ({id, threadName}) => {
    const dispatch = useDispatch();
    const [threadInfo, setThreadInfo] = useState([]);

    useEffect(() => {
        db.collection('threads')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setThreadInfo(snapshot.docs.map((doc) => doc.data())));
    }, [id])

    return (
        <div className="sidebarThread" onClick={() => dispatch(setThread({threadId: id, threadName: threadName}))}>
            <Avatar src={threadInfo[0]?.photo} />

            <div className="sidebarThread__details">
                <h3>{threadName}</h3>
                <p>{threadInfo[0]?.message}</p>
                <small className="sidebarThread__timestamp">
                    {new Date(threadInfo[0]?.timestamp?.toDate()).toLocaleDateString()}
                </small>
            </div>
        </div>
    )
}

export default SidebarThread
