import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setoffer } from '../../../store/actions/UIActions';
import openSocket from 'socket.io-client';

import unknown from '../../../static/images/unknown.jpg';
import classes from './ChatHead.module.scss';

import Message from '../Message/Messsage';
import agent from '../../../api/agent';

interface Props {
    id: string;
    home: string;
    away: string;
    offerAvatar: string;
    rentId: string;
    offerName: string,
    texts: []
}

const Chat: FC<Props> = ({ id, home, away, rentId, offerAvatar, texts, offerName }) => {
    const dispatch = useDispatch();
    //const { loading } = useSelector((state: RootState) => state.offers);
    const { toUpdate } = useSelector((state: RootState) => state.UI);
    const { rents } = useSelector((state: RootState) => state.offers);
    const [messages, setMessages] = useState<Array<any>>(texts);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const socket = openSocket('http://localhost:8080', {
            withCredentials: true
        });
        socket.on("Texts", data => {
            console.log(data.text.content)
            if (data.action === "create") {
                setMessages(messages => [...messages, data.text])
            }
        })
    }, []);

    const closeHandler = () => {
        dispatch(setmodalstyle(true))

        //add a cleanup function for the chathead component, nullify all values so the chat can be
        //reset again. Also required to stop the socket!
        setTimeout(() => {
            dispatch(setmodal(false));
            dispatch(setconvo(null));
            dispatch(setbackdrop(false));
            dispatch(setoffer(null, ""));
            dispatch(setmodaltype(""));
        }, 700);
    }

    const sendMessageHandler = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (newMessage == "")
            return

        const sentMsg = await agent.texts.send(away, newMessage, id)

        setNewMessage("");
    }

    const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.currentTarget.value)
    }

    const visitHandler = () => {
        dispatch(setmodaltype("View"));
    }

    return (
        <div className={classes.chat}>
            {/* {loading ?
                <Loader />
                :
                null
            } */}
            <div className={classes.header}>
                <h1>{offerName}</h1>
                <button onClick={visitHandler}>Visit</button>
                <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                    cancel_presentation
                </span>
            </div>
            <hr></hr>
            <div className={classes.content}>
                <ul>
                    {messages.map(message => {
                        //@ts-ignore
                        return <Message key={message._id} content={message.content} createdAt={message.createdAt} displayName={message.author._id} avatar={message.avatar ? message.avatar : unknown} />
                    })}
                </ul>
            </div>
            <div className={classes.type}>
                <div className={classes.textfieldArea}>
                    <textarea
                        className={classes.input}
                        value={newMessage}
                        onChange={messageHandler}
                        placeholder={"Enter your message"}
                        cols={50}
                        rows={10}
                    >
                    </textarea>
                </div>
                <div className={classes.sendArea}>
                    <div className={classes.send} onClick={sendMessageHandler}>
                        <span className="material-icons md-36">
                            send
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;