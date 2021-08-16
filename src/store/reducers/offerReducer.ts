import { CREATE_OFFER_FAILURE, CREATE_OFFER_LOADING, CREATE_OFFER_SUCCESS, DELETE_OFFER_FAILURE, DELETE_OFFER_LOADING, DELETE_OFFER_SUCCESS, LIST_CONVERSATIONS, LIST_OFFER_FAILURE, LIST_OFFER_LOADING, LIST_OFFER_SUCCESS, offerAction, offerState, SET_CREATE_SUCCESS, SET_DEL_SUCCESS, SET_FILTER, SET_IMAGES, SET_IMAGE_AMOUNT, SET_IMAGE_AMOUNT_LOADING, SET_IMAGE_AMOUNT_MAX, SET_IMAGE_LINKS, SET_IMAGE_NAMES, SET_IMAGE_SUCCESS, SET_LOADING_OFFER, SET_LOCATION, SET_OFFERS_IDS, SET_UPDATE_SUCCESS, SET_ROOMS, SET_ROOM_SIZE, SET_ROOM_TYPE, SET_VIEW_OFFER, UPDATE_OFFER_FAILURE, UPDATE_OFFER_LOADING, UPDATE_OFFER_SUCCESS, LOAD_TEXTS, SET_CONVO_RENT } from '../types'

const initialState: offerState = {
    rooms: [],
    location: { lat: 50.721680, lng: -1.878530, },
    images: null,
    imageLinks: [],
    loading: false,
    error: false,
    ready: false,
    successCreate: false,
    successDelete: false,
    successUpdate: false,
    imageAmount: 0,
    rents: [],
    rentsID: [],
    imageLoading: false,
    imageMaxAmount: false,
    convos: null,
    convo: null,
    texts: null,
    imageNames: [],
    imageSuccess: false
}

export default (state = initialState, action: offerAction) => {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        case SET_ROOM_TYPE:
            return {
                ...state,
                rooms: action.payload
            }
        case SET_ROOM_SIZE:
            return {
                ...state,
                rooms: action.payload
            }
        case SET_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        case SET_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case CREATE_OFFER_SUCCESS:
            return {
                ...state,
                loading: action.payload,
                successCreate: action.payload2
            }
        case CREATE_OFFER_FAILURE:
            return {
                ...state,
                loading: action.payload
            }
        case CREATE_OFFER_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case DELETE_OFFER_SUCCESS:
            return {
                ...state,
                loading: action.payload,
                successDelete: action.payload2
            }
        case DELETE_OFFER_FAILURE:
            return {
                ...state,
                loading: action.payload
            }
        case DELETE_OFFER_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case UPDATE_OFFER_SUCCESS:
            return {
                ...state,
                loading: action.payload,
                successUpdate: action.payload2
            }
        case UPDATE_OFFER_FAILURE:
            return {
                ...state,
                loading: action.payload
            }
        case UPDATE_OFFER_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case LIST_OFFER_SUCCESS:
            return {
                ...state,
                loading: action.payload,
                rents: action.payload2
            }
        case LIST_OFFER_FAILURE:
            return {
                ...state,
                loading: action.payload
            }
        case LIST_OFFER_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_IMAGE_AMOUNT:
            return {
                ...state,
                imageAmount: action.payload,
            }
        case SET_IMAGE_AMOUNT_MAX:
            return {
                ...state,
                imageLoading: action.payload,
            }
        case SET_IMAGE_AMOUNT_LOADING:
            return {
                ...state,
                imageLoading: action.payload,
            }
        case SET_LOADING_OFFER:
            return {
                ...state,
                loading: action.payload,
            }
        case SET_IMAGE_LINKS:
            return {
                ...state,
                imageLinks: action.payload,
                images: action.payload2
            }
        case SET_CREATE_SUCCESS:
            return {
                ...state,
                successCreate: action.payload,
            }
        case SET_DEL_SUCCESS:
            return {
                ...state,
                successDelete: action.payload,
            }
        case SET_OFFERS_IDS:
            return {
                ...state,
                rentsID: action.payload,
            }
        case SET_IMAGE_NAMES:
                return {
                    ...state,
                    imageNames: action.payload,
                }
        case SET_FILTER:
                return {
                    ...state,
                    rents: action.payload,
                }
        case LIST_CONVERSATIONS:
            return {
                ...state,
                texts: action.payload,
            }
        case SET_IMAGE_SUCCESS:
            return {
                ...state,
                imageSuccess: action.payload,
            }
        case SET_UPDATE_SUCCESS:
            return {
                ...state,
               successUpdate: action.payload,
            }
        case SET_CONVO_RENT:
            return {
                ...state,
               convo: action.payload,
            }
        default:
            return state;
    }
}