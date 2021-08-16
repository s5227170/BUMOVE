import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

import classes from './stylesheets/View.module.scss';
import useMap from '../../../hooks/Map/useMap';
import ImageBrowser from '../ImageBrowser/ImageBrowser';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setoffer, setshowdel } from '../../../store/actions/UIActions';
import Delete from './Delete';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import agent from '../../../api/agent';
import { Conversation } from '../../../store/types';
import { getconversationbyrent, setconversations } from '../../../store/actions/offerActions';

const View: FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth)
    const { authenticated } = useSelector((state: RootState) => state.auth)
    const { offer } = useSelector((state: RootState) => state.UI)
    const { showDel } = useSelector((state: RootState) => state.UI)
    const { convo } = useSelector((state: RootState) => state.offers)
    const [exist, setExist] = useState(false);
    const [unlocked, setUnlocked] = useState(false)
    //const [messages, setMessages] = useState<any>();
    //const [messages2, setMessages2] = useState<any>();
    const [existingConversation, setExistingConversation] = useState<any>();
    const Map = useMap("view", offer!.location);

    useEffect(() => {
        // if (authenticated) {
        //     const msgs = firebase.firestore().collection('messages');
        //     msgs
        //         .where('away', '==', user?.id)
        //         .onSnapshot((querySnapshot: any) => {
        //             querySnapshot.forEach((doc: any) => {
        //                 setMessages(doc.data());
        //                 setExist(true);
        //             })
        //         });

        //     msgs
        //         .where('home', '==', user?.id)
        //         .onSnapshot((querySnapshot: any) => {
        //             querySnapshot.forEach((doc: any) => {
        //                 setMessages2(doc.data());
        //                 setExist(true);
        //             })
        //         })
        // }
        setUnlocked(false)
        dispatch(getconversationbyrent(offer!._id))

    }, [])

    useEffect(() => {
        if (convo) {
            setExistingConversation(convo)
            setUnlocked(true)
            setExist(true)
        }
        setUnlocked(true)
    }, [convo])

    const messageHandler = async () => {
        //the "exist" variable checks if the conversation already exists and if it does
        //it takes its texts, otherwise it creates a new conversation in the "else" section

        if (exist) {
            if (existingConversation) {
                dispatch(setconvo({ _id: existingConversation.id, home: existingConversation.home, rentId: existingConversation.rentId, away: existingConversation.away, offerAvatar: existingConversation.offerAvatar, texts: existingConversation.texts }))

                dispatch(setmodaltype("Chat"));
                dispatch(setmodal(true));
                dispatch(setbackdrop(true));
            }
        } else {
            // const db = firebase.firestore().collection('messages');
            // const name = uuid()
            // db
            //     .doc(name)
            //     .set({
            //         home: user?.id,
            //         away: offer?.by,
            //         id: name,
            //         offerAvatar: offer?.images[0],
            //         name: offer?.title,
            //         offerID: offer?.id
            //     })
            //     .catch((err: any) => {
            //         console.error(err);
            //     });
            //console.log(offer!.author)

            // @ts-ignore
            const fetchConvo = await agent.conversation.create(offer!.author._id, offer!._id);
            if (fetchConvo) {
                dispatch(setconvo({ _id: fetchConvo.id, home: fetchConvo.home, rentId: fetchConvo.rentId, away: fetchConvo.away, offerAvatar: fetchConvo.offerAvatar, texts: fetchConvo.texts }))
            }

            //dispatch(setconvo({ user: user!, convoID: offer!.id, convo: name, name: offer!.title }))
            dispatch(setmodaltype("Chat"));
            dispatch(setmodal(true));
            dispatch(setbackdrop(true));
        }
    }

    const updateHandler = () => {
        dispatch(setmodaltype("Update"))
    }

    const closeHandler = () => {

        dispatch(setmodalstyle(true))

        setTimeout(() => {
            dispatch(setmodal(false));
            dispatch(setconvo(null));
            dispatch(setbackdrop(false));
            dispatch(setoffer(null, ""));
            dispatch(setmodaltype(""));
        }, 700);
    }

    const showDelete = () => {
        if (exist) {
            if (existingConversation) {
                dispatch(setconvo({ _id: existingConversation.id, home: existingConversation.home, rentId: existingConversation.rentId, away: existingConversation.away, offerAvatar: existingConversation.offerAvatar, texts: existingConversation.texts }));
            }
        }
        dispatch(setshowdel(!showDel));
    }

    return (
        <section className={classes.section} >
            {showDel ?
                <Delete />
                :
                null}
            <div className={classes.col1}>
                <h2>{offer?.title}</h2>
                <hr></hr>
                <div className={classes.row1}>
                    <ImageBrowser images={offer!.images} />
                </div>
                <div className={classes.row2}>
                    <div className={classes.map}>
                        {Map}
                    </div>
                </div>
            </div>
            <div className={classes.col2}>
                <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                    cancel_presentation
                </span>
                <div className={classes.row1}>
                    <div className={classes.rooms}>
                        <h3>Rooms</h3>
                        <hr></hr>
                        <div className={classes['room-types']}>
                            {offer!.rooms.map(room => {
                                return <div key={uuid()}>
                                    {room.type == "Bedroom" ?
                                        <Fragment>
                                            <span className="material-icons md-24">
                                                bedroom_child
                                            </span>
                                            <h5>{room.size + " " + room.type} </h5>
                                        </Fragment>
                                        :
                                        null
                                    }
                                    {room.type == "Bathroom" ?
                                        <Fragment>
                                            <span className="material-icons md-24">
                                                shower
                                            </span>
                                            <h5>{room.size + " " + room.type} </h5>
                                        </Fragment>
                                        :
                                        null
                                    }
                                    {room.type == "Living room" ?
                                        <Fragment>
                                            <span className="material-icons md-24">
                                                tv
                                            </span>
                                            <h5>{room.size + " " + room.type} </h5>
                                        </Fragment>
                                        :
                                        null
                                    }
                                    {room.type == "Kitchen" ?
                                        <Fragment>
                                            <span className="material-icons md-24">
                                                dining
                                            </span>
                                            <h5>{room.size + " " + room.type} </h5>
                                        </Fragment>
                                        :
                                        null
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                    <div className={classes.contact}>
                        <div className={classes.price}>
                            {offer!.price + "£"}
                        </div>
                        <div className={classes.message}>
                            {authenticated ?
                                //@ts-ignore
                                offer!.author._id == user!._id ?
                                    <button onClick={() => alert("You are the owner of that offer!")}>Message</button>
                                    :
                                    <button disabled={!unlocked} onClick={messageHandler} >Message</button>
                                :
                                <button onClick={() => alert("You need to be registered in order to message the owner of this offer!")}>Message</button>
                            }
                        </div>
                        {authenticated ?
                            //@ts-ignore
                            offer!.author._id == user?._id ?
                                <Fragment>
                                    <button className={classes.edit} onClick={updateHandler}>Edit Offer</button>
                                    <button className={classes.delete} onClick={showDelete}>Delete offer</button>
                                </Fragment>
                                :
                                null
                            :
                            null
                        }
                    </div>
                </div>
                <div className={classes.row2}>
                    <div>
                        <h5>Information</h5>
                        <textarea rows={17} cols={45} value={offer?.information} disabled></textarea>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default View;