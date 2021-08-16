import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setshowchat } from '../../../store/actions/UIActions';

import classes from './Messages.module.scss';
import ChatHead from '../ChatHead/ChatHead';
import { v4 as uuid } from 'uuid';
import { setconversations } from '../../../store/actions/offerActions';

const Messages: FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth)
    const { convos } = useSelector((state: RootState) => state.offers)
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [msgItems, setMsgItems] = useState<Array<any>>([]);

    useEffect(() => {
        if(convos){
            setMsgItems(convos)
        }
    }, [convos])

    useEffect(() => {
        dispatch(setconversations());
    }, [])

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
                            <span id={classes['continue']} className="material-icons md-36" onClick={() => (dispatch(setmodaltype("Chat")), dispatch(setconvo({ _id: item.id, home: item.home, rentId: item.rentId, away: item.away, offerAvatar: item.offerAvatar, texts: item.texts })))}>
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
