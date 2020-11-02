import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import SidebarThread from './SidebarThread'
import { Avatar, IconButton } from '@material-ui/core'
import db, { auth } from '../firebase'
import SearchIcon from '@material-ui/icons/Search'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined'
import PhoneOutlined from '@material-ui/icons/PhoneOutlined'
import QuestionAnswerOutlined from '@material-ui/icons/QuestionAnswerOutlined'
import Settings from '@material-ui/icons/Settings'
import './Sidebar.css'

const Sidebar = () => {
    const user = useSelector(selectUser);
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        db.collection('threads').onSnapshot((snapshot) => setThreads(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))
    }, [])

    const addThread = () => {
        const threadName = prompt("Enter a thread name");
        if (threadName) {
            db.collection('threads').add({
                threadName
            });
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon className="sidebar__searchIcon" />
                    <input placeholder="Search" className="sidebar__input" />
                </div>

                <IconButton variant="outlined" className="sidebar__button" onClick={addThread}>
                    <BorderColorOutlinedIcon  />
                </IconButton>
            </div>

            <div className="sidebar__threads">
                {threads.map(({id, data: {threadName}}) => (
                    <SidebarThread key={id} id={id} threadName={threadName} />
                ))}
            </div>

            <div className="sidebar__bottom">
                <Avatar className="sidebar__bottom__avatar" onClick={() => auth.signOut()}/>

                <IconButton>
                    <PhoneOutlined />
                </IconButton>

                <IconButton>
                    <QuestionAnswerOutlined />
                </IconButton>

                <IconButton>
                    <Settings />
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar
