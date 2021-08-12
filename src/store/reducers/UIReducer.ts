import { SET_AUTH_MESSAGE_CHECK, SET_AVATAR, SET_BACKDROP, SET_CONVO, SET_MODAL_STYLE, SET_MODAL_TYPE, SET_OFFER, SET_OFFER_DELETE, SET_PAGE, SET_SHOW_CHAT, SET_SHOW_DEL, SET_VIEW_OFFER, SHOW_MODAL, UIAction, UIState } from '../types'

const initialState: UIState = {
    page: "",
    showModal: false,
    backdrop: false,
    modalType: "",
    offer: null,
    showDel: false,
    showChat: false,
    convo: null,
    toDelete: "",
    toUpdate: "",
    avatar: "",
    modalStyle: false,
}

export default (state = initialState, action: UIAction) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload
            }
        case SET_BACKDROP:
            return {
                ...state,
                backdrop: action.payload
            }
        case SET_MODAL_TYPE:
            return {
                ...state,
                modalType: action.payload
            }
        case SET_OFFER:
            return {
                ...state,
                offer: action.payload,
                toUpdate: action.payload2
            }
        case SET_SHOW_DEL:
            return {
                ...state,
                showDel: action.payload
            }
        case SET_SHOW_CHAT:
            return {
                ...state,
                showChat: action.payload
            }
        case SET_CONVO:
            return {
                ...state,
                convo: action.payload
            }
        case SET_VIEW_OFFER:
            return {
                ...state,
                offer: action.payload,
            }
        case SET_OFFER_DELETE:
            return {
                ...state,
                toDelete: action.payload,
            }
        case SET_AVATAR:
            return {
                ...state,
                avatar: action.payload,
            }
        case SET_MODAL_STYLE:
            return {
                ...state,
                modalStyle: action.payload,
            }
        
        default:
            return state;
    }
}