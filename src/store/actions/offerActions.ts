import { UIAction, SET_ROOMS, Room, offerAction, SET_ROOM_TYPE, SET_LOCATION, coordinates, SET_IMAGES, Rent, CREATE_OFFER_LOADING, CREATE_OFFER_SUCCESS, CREATE_OFFER_FAILURE, SET_IMAGE_AMOUNT, SET_LOADING_OFFER, SET_IMAGE_LINKS, LIST_OFFER_LOADING, LIST_OFFER_SUCCESS, SET_IMAGE_AMOUNT_LOADING, SET_IMAGE_AMOUNT_MAX, DELETE_OFFER_FAILURE, DELETE_OFFER_SUCCESS, DELETE_OFFER_LOADING, UPDATE_OFFER_LOADING, UPDATE_OFFER_SUCCESS, UPDATE_OFFER_FAILURE, SET_SHOW_DEL, SET_DEL_SUCCESS, SET_OFFERS_IDS, SET_IMAGE_NAMES, LIST_CONVERSATIONS, AuthAction, SET_IMAGE_SUCCESS, SET_UPDATE_SUCCESS, SET_CREATE_SUCCESS, } from '../types';
import { Dispatch } from 'redux';
import agent from '../../api/agent';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export const setroomcount = (rooms: number) => (dispatch: Dispatch<offerAction>) => {
    const newArr: Room[] = []
    for (let i = 0; i < rooms; i++) {
        newArr.push({ type: "Bedroom", size: "Small" })
    }
    try {
        dispatch({
            type: SET_ROOMS,
            payload: newArr
        });
    } catch (e) {

    }
}

export const setroomtype = (type: string, index: number, currentRooms: Room[] | null) => (dispatch: Dispatch<offerAction>) => {
    let newRooms: Room[] = []

    if (currentRooms) {
        newRooms = [...currentRooms]
    } else {
        newRooms = []
    }

    for (let i = 0; i < newRooms.length; i++) {
        if (i == index) {
            newRooms[i].type = type;
        }
    }
    try {
        dispatch({
            type: SET_ROOM_TYPE,
            payload: newRooms
        });
    } catch (e) {

    }
}

export const setroomsize = (size: string, index: number, currentRooms: Room[] | null) => (dispatch: Dispatch<offerAction>) => {
    let newRooms: Room[] = []

    if (currentRooms) {
        newRooms = [...currentRooms]
    } else {
        newRooms = []
    }

    for (let i = 0; i < newRooms.length; i++) {
        if (i == index) {
            newRooms[i].size = size;
        }
    }
    try {
        dispatch({
            type: SET_ROOMS,
            payload: newRooms
        });
    } catch (e) {

    }
}

export const setlocation = (location: coordinates) => (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: SET_LOCATION,
            payload: location
        })

    } catch (e) {

    }
}

export const setimages = (imgs: File[] | null) => (dispatch: Dispatch<offerAction>) => {
    let newImgs: File[] | null;
    newImgs = [];
    if (imgs)
        newImgs = [...imgs!]

    try {
        dispatch({
            type: SET_IMAGES,
            payload: newImgs
        })

    } catch (e) {

    }
}

export const setimageamount = (currentAmount: number, amount: number) => (dispatch: Dispatch<offerAction>) => {
    const finalAmount = currentAmount + amount;
    try {
        dispatch({
            type: SET_IMAGE_AMOUNT_LOADING,
            payload: true

        })
        if (finalAmount <= 10) {
            dispatch({
                type: SET_IMAGE_AMOUNT,
                payload: finalAmount
            })
        } else {
            dispatch({
                type: SET_IMAGE_AMOUNT_MAX,
                payload: true
            })
        }
        dispatch({
            type: SET_IMAGE_AMOUNT_LOADING,
            payload: false

        })
    } catch (e) {

    }
}

export const setimagelinks = (images: File[], links: string[]): ThunkAction<void, RootState, null, offerAction> => {
    return async dispatch => {
        let files = new FormData();
        let names = [];
    try {
        for (let i = 0; i < images.length; i++) {
            files.append("image", images[i])
            names.push(images[i].name)
        }

        // fetch("http://localhost:8080/post-image", {
        //     method: "PUT",
        //     body: files
        // }).then(links => {
        //     console.log( links )
        // })
        axios({method: "put", url: 'http://localhost:8080/post-image', baseURL: "",data: files, withCredentials: true}).then(links => {
            dispatch({
                type: SET_IMAGE_NAMES,
                payload: links.data.links
            });
            dispatch({
                type: SET_IMAGE_LINKS,
                payload: links.data.links,
                payload2: null
            });
            dispatch({
                type: SET_IMAGE_SUCCESS,
                payload: true
            })
        })
        
    } catch (e) {

    }
    }
}

export const setimagesuccess = (success: boolean) => (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: SET_IMAGE_SUCCESS,
            payload: success
        })
    } catch (e) {

    }
}

export const setloadingoffer = (load: boolean) => (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: SET_LOADING_OFFER,
            payload: load
        })

    } catch (e) {

    }
}

export const setcreatesuccess = (success: boolean) => (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: SET_CREATE_SUCCESS,
            payload: success
        })

    } catch (e) {

    }
}

export const setupdatesuccess = (success: boolean) => (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: SET_UPDATE_SUCCESS,
            payload: success
        })

    } catch (e) {

    }
}

export const setdeletesuccess = (success: boolean) => (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: SET_DEL_SUCCESS,
            payload: success
        })

    } catch (e) {

    }
}

export const createoffer = (offer: Rent) => async (dispatch: Dispatch<offerAction>) => {

    try {
        dispatch({
            type: CREATE_OFFER_LOADING,
            payload: true
        })

        await agent.toRent.create(offer).then(
            async () => {
                dispatch({
                    type: CREATE_OFFER_SUCCESS,
                    payload: false,
                    payload2: true
                });
                dispatch({
                    type: SET_LOADING_OFFER,
                    payload: false
                });
            }
        )
    } catch (e) {
        dispatch({
            type: CREATE_OFFER_FAILURE,
            payload: false,
            payload2: true
        })
    }
}

export const updateoffer = (offer: Rent, id: string) => async (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: UPDATE_OFFER_LOADING,
            payload: true
        })

        await agent.toRent.update(id, offer).then(
            async () => {
                dispatch({
                    type: UPDATE_OFFER_SUCCESS,
                    payload: false,
                    payload2: true
                });
                dispatch({
                    type: SET_LOADING_OFFER,
                    payload: false
                });
            }
        )
    } catch (e) {
        dispatch({
            type: UPDATE_OFFER_FAILURE,
            payload: false,
            payload2: true
        })
    }
}

export const deleteoffer = (id: string, imgs: string[], textDel?: any, convo?: string) => async (dispatch: Dispatch<offerAction>) => {
    const storageRef = firebase.storage().ref('/images/');

    try {
        dispatch({
            type: DELETE_OFFER_LOADING,
            payload: true
        })
        await agent.toRent.delete(id).then(
            async response => {
                dispatch({
                    type: DELETE_OFFER_SUCCESS,
                    payload: false,
                    payload2: true
                });
            }
        )
    } catch (e) {
        dispatch({
            type: DELETE_OFFER_FAILURE,
            payload: false,
            payload2: true
        })
        console.log(e)
    }
}

export const listoffers = () => async (dispatch: Dispatch<offerAction>) => {
    try {
        dispatch({
            type: LIST_OFFER_LOADING,
            payload: true
        })
        const rents = await agent.toRent.list();
                if(rents)
                dispatch({
                    type: LIST_OFFER_SUCCESS,
                    payload: false,
                    // @ts-ignore
                    payload2: rents.data.rents.rents
                });
    } catch (e) {
        dispatch({
            type: CREATE_OFFER_FAILURE,
            payload: false,
            payload2: true
        })
    }
}

export const filteroffers = (ids: string[], all: Rent[], min: number, max: number, rooms: number, title: string, description: string, type: string) => async (dispatch: Dispatch<offerAction>) => {
    let newRents: Rent[] = [];
    let newKeys: string[] = [];

    for (let i = 0; i < all.length; i++) {
        if (all[i].price > min &&
            all[i].price < max &&
            all[i].title.includes(title) &&
            all[i].information.includes(description) &&
            all[i].rooms.length == rooms &&
            all[i].type == type) {
            newRents.push(all[i])
            newKeys.push(ids[i])
        }
    }

    try {
        dispatch({
            type: LIST_OFFER_LOADING,
            payload: true
        })
        dispatch({
            type: LIST_OFFER_SUCCESS,
            payload: false,
            payload2: newRents,
        });
        dispatch({
            type: SET_OFFERS_IDS,
            payload: newKeys
        })
    } catch (e) {
        dispatch({
            type: CREATE_OFFER_FAILURE,
            payload: false,
            payload2: true
        })
    }
}

export const setconversations = () => async (dispatch: Dispatch<offerAction>) => {
    try {
        const convos = await agent.conversation.list()
        dispatch({
            type: LIST_CONVERSATIONS,
            payload: convos
        })

    } catch (e) {

    }
}
