import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setshowchat } from '../../../store/actions/UIActions';

import firebase from 'firebase';
import classes from './Messages.module.scss';
import ChatHead from '../ChatHead/ChatHead';
import { v4 as uuid } from 'uuid';
import agent from '../../../api/agent';

const Messages: FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [msgItems, setMsgItems] = useState<Array<any>>([]);
    const [msgItems2, setMsgItems2] = useState<Array<any>>([]);
    //const msgs = firebase.firestore().collection('messages');

    function getMsgs() {
        // setLoading(true);
        // const items: any[] = [];

        // msgs
        //     .where('away', '==', user?.id)
        //     .onSnapshot((querySnapshot: any) => {
        //         querySnapshot.forEach((doc: any) => {
        //             setMsgItems([...msgItems, doc.data()])
        //         })
        //     });

        // msgs
        //     .where('home', '==', user?.id)
        //     .onSnapshot((querySnapshot: any) => {
        //         querySnapshot.forEach((doc: any) => {
        //             setMsgItems2([...msgItems2, doc.data()])
        //         })
        //     });
        // setLoading(false);
        // setLoaded(true);
        

    }

    // useEffect(() => {
    //     if (!loaded)
    //         getMsgs();
    // }, [])

    const closeHandler = () => {
        dispatch(setmodalstyle(true))

        setTimeout(() => {
            dispatch(setmodal(false));
            dispatch(setbackdrop(false));
            dispatch(setmodaltype(""));
          }, 750);
    }

    return (
        <Fragment>
            <div className={classes.messages}>
                <div className={classes.header}>
                    <h1>My Messages</h1>
                    <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                        cancel_presentation
                    </span>
                </div>
                <hr></hr>
                <div className={classes.browse}>
                    {msgItems.map(item => {
                        return <div className={classes.conversation} key={uuid()} >
                            <img src={item.offerAvatar} alt={"Avatar"} />
                            <h5>{item.name}</h5>
                            <span id={classes['continue']} className="material-icons md-36" onClick={() => (dispatch(setmodaltype("Chat")), dispatch(setconvo({ id: item.id, home: item.home, rentId: item.rentId, away: item.away, offerAvatar: item.offerAvatar, texts: item.texts })))}>
                                double_arrow
                            </span>
                        </div>
                    })}
                    {msgItems2.map(item => {
                        return <div className={classes.conversation} key={uuid()} >
                            <img src={item.offerAvatar} alt={"Avatar"} />
                            <h5>{item.name}</h5>
                            <span id={classes['continue']} className="material-icons md-36" onClick={() => (dispatch(setmodaltype("Chat")), dispatch(setconvo({ id: item.id, home: item.home, rentId: item.rentId, away: item.away, offerAvatar: item.offerAvatar, texts: item.texts })))}>
                                double_arrow
                            </span>
                        </div>
                    })}
                </div>
            </div>
        </Fragment>
    );
}

export default Messages;
