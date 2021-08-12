import React, { ChangeEvent, FC, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setbackdrop, setmodal, setmodaltype, setoffer } from '../../../store/actions/UIActions';
import openSocket from 'socket.io-client';

import unknown from '../../../static/images/unknown.jpg';
import Loader from '../Loader/Loader';
import classes from './ChatHead.module.scss';
import firebase from 'firebase/app';
import { User } from '../../../store/types';
import { v4 as uuid } from 'uuid';

import Message from '../Message/Messsage';
import agent from '../../../api/agent';

interface Props {
    id: string;
    home: string;
    away: string;
    offerAvatar: string;
    rentId: string;
    texts: []
}

const Chat: FC<Props> = ({ id, home, away, rentId, offerAvatar, texts }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.offers);
    const { toUpdate } = useSelector((state: RootState) => state.UI);
    const { rents } = useSelector((state: RootState) => state.offers);
    const [conversaions, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [rentName, setRentName] = useState("");
    //const db = firebase.firestore().collection('messages');

    useEffect(() => {
        // if (db) {

        //     const unsubscribe = db
        //         .doc(convo)
        //         .collection('texts')
        //         .orderBy('createdAt')
        //         .limit(100)
        //         .onSnapshot((querySnapshot: any) => {
        //             const data = querySnapshot.docs.map((doc: any) => ({
        //                 ...doc.data(),
        //                 id: doc.id,
        //             }));
        //             setMessages(data);
        //         })

        //     return unsubscribe;
        // }
        agent.toRent.details(rentId).then(response => {
            console.log(response)
            setRentName(response.title)
        })
        openSocket('http://localhost:8080');
        
    }, []);

    useEffect(() => {
        if (rents)
            //@ts-ignore
            for (let i = 0; i < rents.length; i++) {
                //@ts-ignore
                if (rents[i]!.id == convoID) {
                    dispatch(setoffer(rents[i], toUpdate))
                }
            }
    }, [rents])



    const closeHandler = () => {
        dispatch(setmodal(false));
        dispatch(setbackdrop(false));
        dispatch(setmodaltype(""));
    }

    const sendMessageHandler = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        // if (newMessage == "")
        //     return

        // if (db) {
        //     db.doc(convo).collection('texts').add({
        //         content: newMessage,
        //         author: user.id,
        //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //         convoID: convo,
        //         name: user.name,
        //     })
        // }


        // setNewMessage("");
    }

    const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.currentTarget.value)
    }

    const visitHandler = () => {
        dispatch(setmodaltype("View"));
    }

    return (
        <div className={classes.chat}>
            {loading ?
                <Loader />
                :
                null
            }
            <div className={classes.header}>
                <h1>{rentName}</h1>
                <button onClick={visitHandler}>Visit</button>
                <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                    cancel_presentation
                    </span>
            </div>
            <hr></hr>
            <div className={classes.content}>
                <ul>
                    {conversaions.map(message => {
                        //@ts-ignore
                        return <Message key={message.id} content={message.content} createdAt={message.createdAt} displayName={message.author} avatar={message.avatar ? message.avatar : unknown} />
                    })}
                </ul>
            </div>
            <div className={classes.type}>
                <textarea
                    className={classes.input}
                    value={newMessage}
                    onChange={messageHandler}
                    placeholder={"Enter your message"}
                    cols={50}
                    rows={10}
                >
                </textarea>
                <div className={classes.send} onClick={sendMessageHandler}>
                    <span className="material-icons md-48">
                        send
                        </span>
                </div>
            </div>
        </div>
    );
}

export default Chat;