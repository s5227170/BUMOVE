import firebase from 'firebase';
import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { deleteoffer, setdeletesuccess } from '../../../store/actions/offerActions';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setoffer, setshowdel } from '../../../store/actions/UIActions';

import classes from './stylesheets/Delete.module.scss';


const Delete: FC = () => {
    const dispatch = useDispatch();
    const { offer } = useSelector((state: RootState) => state.UI)
    const { showDel } = useSelector((state: RootState) => state.UI)
    const { convo } = useSelector((state: RootState) => state.UI)
    const { toDelete } = useSelector((state: RootState) => state.UI)
    const { successDelete } = useSelector((state: RootState) => state.offers)
    const msgs = firebase.firestore().collection('messages')


    const confirmHandler = () => {
        if (convo) {
            dispatch(deleteoffer(toDelete!, offer!.imgnames, msgs, convo!.rentId))
        } else {
            dispatch(deleteoffer(toDelete, offer!.imgnames));
        }
    }

    const declineHandler = () => {
        dispatch(setshowdel(!showDel))
        dispatch(setconvo(null));
    }

    useEffect(() => {
        if (successDelete == true) {
            dispatch(setmodalstyle(true))

        setTimeout(() => {
            dispatch(setshowdel(!showDel))
            dispatch(setmodal(false));
            dispatch(setbackdrop(false));
            dispatch(setoffer(null, ""));
            dispatch(setmodaltype(""));
            dispatch(setdeletesuccess(false));
            dispatch(setconvo(null));
        }, 750);      
        }
    }, [successDelete])

    return (
        <Fragment>
            <div className={classes['delete-backdrop']}></div>
            <div className={classes['delete-container']}>
                <h3>Delete this offer</h3>
                <div>
                    <button className={classes.yes} onClick={confirmHandler}>Confirm</button>
                    <button className={classes.no} onClick={declineHandler}>Decline</button>
                </div>
            </div>
        </Fragment>
    );
}

export default Delete;