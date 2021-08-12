import { UIAction, SET_PAGE, SHOW_MODAL, SET_BACKDROP, SET_MODAL_TYPE, Rent, SET_OFFER, SET_SHOW_DEL, SET_SHOW_CHAT, Conversation, SET_CONVO, SET_OFFER_DELETE, SET_AVATAR, User, SET_MODAL_STYLE, SET_AUTH_MESSAGE_CHECK, } from '../types';
import { Dispatch } from 'redux';
import firebase from 'firebase';

export const setpage = (value: "" | "SignIn" | "Browse" | "SignUp" | "/") => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_PAGE,
            payload: value
        });
    } catch (e) {

    }
}

export const setmodal = (show: boolean) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SHOW_MODAL,
            payload: show
        });
    } catch (e) {

    }
}

export const setbackdrop = (show: boolean) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_BACKDROP,
            payload: show
        });
    } catch (e) {

    }
}

export const setmodaltype = (type: "View" | "Create" | "Update" | "Message" | "Chat" | "Profile" | "") => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_MODAL_TYPE,
            payload: type,
        })
    } catch (e) {

    }
}

export const setoffer = (offer: Rent | null, offerID: string) => (dispatch: Dispatch<UIAction>) => {
    console.log(offerID)
    try {
        dispatch({
            type: SET_OFFER,
            payload: offer,
            payload2: offerID
        });
    } catch (e) {

    }
}

export const setshowdel = (show: boolean) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_SHOW_DEL,
            payload: show
        })
    } catch (e) {

    }
}

export const setshowchat = (show: boolean) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_SHOW_CHAT,
            payload: show
        })
    } catch (e) {

    }
}

export const setconvo = (convo: Conversation | null) => (dispatch: Dispatch<UIAction>) => {

    try {
        dispatch({
            type: SET_CONVO,
            payload: convo
        })
    } catch (e) {

    }
}

export const settodelete = (id: string) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_OFFER_DELETE,
            payload: id
        })
    } catch (e) {

    }
}

export const settoupdate = (id: string) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_OFFER_DELETE,
            payload: id
        })
    } catch (e) {

    }
}

export const setavatar = (avatar: File) => async (dispatch: Dispatch<UIAction>) => {

    try {
        const storageRef = firebase.storage().ref('/images/');
        const fileRef = storageRef.child(avatar.name);
        await fileRef.put(avatar).then(async res =>
            //@ts-ignore
            await fileRef.getDownloadURL().then(url =>
                dispatch({
                    type: SET_AVATAR,
                    payload: url
                }),
            ))

    } catch (e) {

    }
}

export const setmodalstyle = (style: boolean) => (dispatch: Dispatch<UIAction>) => {
    try {
        dispatch({
            type: SET_MODAL_STYLE,
            payload: style
        })
    } catch (e) {

    }
}

