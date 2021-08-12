//Authentication
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';
//UI
export const SET_PAGE = 'SET_PAGE';
export const SET_BACKDROP = 'SET_BACKDROP';
export const SHOW_MODAL = 'SHOW_MODAL';
export const SET_MODAL_TYPE = 'SET_MODAL_TYPE';
export const SET_OFFER = 'SET_OFFER';
export const SET_SHOW_DEL = 'SET_SHOW_DEL';
export const SET_SHOW_CHAT = 'SET_SHOW_CHAT';
export const SET_CONVO = 'SET_CONVO';
export const SET_AVATAR = 'SET_AVATAR';
export const SET_MODAL_STYLE = 'SET_MODAL_STYLE';
export const SET_AUTH_MESSAGE_CHECK = 'SET_AUTH_MESSAGE_CHECK';
//Offers
export const SET_ROOMS = 'SET_ROOMS';
export const SET_ROOM_TYPE = 'SET_ROOM_TYPE';
export const SET_ROOM_SIZE = 'SET_ROOM_SIZE';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_IMAGES = 'SET_IMAGES';
export const CREATE_OFFER_SUCCESS = 'CREATE_OFFER_SUCCESS';
export const CREATE_OFFER_LOADING = 'CREATE_OFFER_LOADING';
export const CREATE_OFFER_FAILURE = 'CREATE_OFFER_FAILURE';
export const LIST_OFFER_SUCCESS = 'LIST_OFFER_SUCCESS';
export const LIST_OFFER_LOADING = 'LIST_OFFER_LOADING';
export const LIST_OFFER_FAILURE = 'LIST_OFFER_FAILURE';
export const DELETE_OFFER_SUCCESS = 'DELETE_OFFER_SUCCESS';
export const DELETE_OFFER_LOADING = 'DELETE_OFFER_LOADING';
export const DELETE_OFFER_FAILURE = 'DELETE_OFFER_FAILURE';
export const UPDATE_OFFER_SUCCESS = 'UPDATE_OFFER_SUCCESS';
export const UPDATE_OFFER_LOADING = 'UPDATE_OFFER_LOADING';
export const UPDATE_OFFER_FAILURE = 'UPDATE_OFFER_FAILURE';
export const SET_IMAGE_NAMES = 'SET_IMAGE_NAMES';
export const SET_IMAGE_AMOUNT = 'SET_IMAGE_AMOUNT';
export const SET_IMAGE_AMOUNT_LOADING = 'SET_IMAGE_AMOUNT_LOADING';
export const SET_IMAGE_AMOUNT_MAX = 'SET_IMAGE_AMOUNT_MAX';
export const SET_LOADING_OFFER = 'SET_LOADING';
export const SET_IMAGE_LINKS = 'SET_IMAGE_LINKS';
export const SET_CREATE_SUCCESS = 'SET_OFFER_SUCCESS';
export const SET_UPDATE_SUCCESS = 'SET_UPDATE_SUCCESS';
export const SET_DEL_SUCCESS = 'SET_DEL_SUCCESS';
export const GET_MSGS = 'GET_MSGS';
export const SET_VIEW_OFFER = 'SET_VIEW_OFFER';
export const SET_OFFERS_IDS = 'SET_OFFERS_IDS';
export const SET_OFFER_DELETE = 'SET_OFFER_DELETE';
export const SET_FILTER = 'SET_FILTER';
export const LIST_CONVERSATIONS = 'LIST_CONVERSATIONS';
export const SET_IMAGE_SUCCESS = 'SET_IMAGE_SUCCESS';

//User
export interface User {
    name: string;
    email: string;
    id: string;
    createdAt: any;
    admin: false;
    avatar: string;
}

//Messages
export interface Message {
    id: string;
    home: string;
    away: string;
    offerAvatar: string;
}

//Rooms
export interface Room {
    type: string;
    size: string;
}

//Rent
export interface Rent {
    _id: string,
    author: string;
    title: string;
    type: string;
    price: number;
    rooms: Room[];
    location: coordinates;
    information: string;
    images: string[];
    imgnames: string[];
    status: string;
}

//coordinates
export interface coordinates {
    lat: number;
    lng: number;
}

//Conversation
export interface Conversation {
    id: string;
    home: string;
    away: string;
    offerAvatar: string;
    rentId: string;
    texts: []
}

//UI state management
export interface UIState {
    page: "SignIn" | "Browse" | "SignUp" | "/" | "";
    showModal: boolean;
    backdrop: boolean;
    modalType: "View" | "Create" | "Update" | "Delete" | "Message" | "Chat" | "Profile" | "";
    offer: Rent | null;
    showDel: boolean,
    showChat: boolean,
    convo: Conversation | null,
    toDelete: string,
    toUpdate: string,
    avatar: string,
    modalStyle: boolean,
}

//Offer state management
export interface offerState {
    rooms: Room[],
    location: coordinates,
    images: File[] | null,
    imageLinks: string[],
    loading: boolean,
    error: boolean,
    ready: boolean,
    successCreate: boolean,
    successDelete: boolean,
    successUpdate: boolean,
    imageAmount: number,
    rents: Rent[],
    rentsID: string[],
    imageLoading: false,
    imageMaxAmount: false,
    imageNames: string[] | [],
    convos: [] | null,
    imageSuccess: false,
}

//Authentication state management
export interface AuthState {
    user: User | null;
    admin: false | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    successAuth: string;
    authChecked: boolean,
}

//Authentication Actions
export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}


interface SetUserAction {
    type: typeof SET_USER;
    payload1: User;
    payload2: boolean;
    payload3: boolean;
}

interface setLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface NeedVerificationAction {
    type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}

interface setAuthMessageCheck{
    type: typeof SET_AUTH_MESSAGE_CHECK,
    payload: boolean
}

//Authentication actions export
export type AuthAction =
    setAuthMessageCheck |
    SetUserAction |
    setLoadingAction |
    SignOutAction |
    SetErrorAction |
    NeedVerificationAction |
    SetSuccessAction;

//UI Actions
interface SetPage {
    type: typeof SET_PAGE;
    payload: "SignIn" | "SignUp" | "Browse" | "/" | "";
}

interface SetShowModal {
    type: typeof SHOW_MODAL,
    payload: boolean,
}

interface SetBackdrop {
    type: typeof SET_BACKDROP,
    payload: boolean,
}

interface SetModalType {
    type: typeof SET_MODAL_TYPE,
    payload: "View" | "Create" | "Update" | "Delete" | "Message" | "Chat" | "Profile" | "";
}

interface SetOffer {
    type: typeof SET_OFFER,
    payload: Rent | null,
    payload2: string
}

interface SetShowDel {
    type: typeof SET_SHOW_DEL,
    payload: boolean
}

interface SetShowChat {
    type: typeof SET_SHOW_CHAT,
    payload: boolean
}

interface SetConvo {
    type: typeof SET_CONVO,
    payload: Conversation | null
}

interface SetViewOffer {
    type: typeof SET_VIEW_OFFER,
    payload: Rent
}

interface SetToDelete {
    type: typeof SET_OFFER_DELETE,
    payload: string
}

interface SetAvatar {
    type: typeof SET_AVATAR,
    payload: string
}

interface SetModalStyle{
    type: typeof SET_MODAL_STYLE,
    payload: boolean
}



//UI Actions export
export type UIAction =
    SetModalStyle |
    SetAvatar |
    SetToDelete |
    SetViewOffer |
    SetConvo |
    SetShowChat |
    SetShowDel |
    SetShowModal |
    SetModalType |
    SetBackdrop |
    SetOffer |
    SetPage;

//Offer Actions export
interface SetRooms {
    type: typeof SET_ROOMS;
    payload: Room[];
}

interface SetRoomType {
    type: typeof SET_ROOM_TYPE,
    payload: Room[];
}

interface SetRoomSize {
    type: typeof SET_ROOM_SIZE,
    payload: Room[];
}

interface SetLocation {
    type: typeof SET_LOCATION,
    payload: coordinates
}

interface SetImages {
    type: typeof SET_IMAGES,
    payload: File[] | null
}

interface CreateOfferSuccess {
    type: typeof CREATE_OFFER_SUCCESS,
    payload: boolean,
    payload2: boolean
}

interface CreateOfferLoading {
    type: typeof CREATE_OFFER_LOADING,
    payload: boolean
}

interface CreateOfferFailure {
    type: typeof CREATE_OFFER_FAILURE,
    payload: boolean,
    payload2: boolean
}

interface ListOfferSuccess {
    type: typeof LIST_OFFER_SUCCESS
    payload: boolean,
    payload2: Rent[]
}

interface ListOfferLoading {
    type: typeof LIST_OFFER_LOADING
    payload: boolean
}

interface ListOfferFailure {
    type: typeof LIST_OFFER_FAILURE
    payload: boolean,
    payload2: boolean
}

interface SetImageAmount {
    type: typeof SET_IMAGE_AMOUNT,
    payload: number
}

interface SetImageAmountLoading {
    type: typeof SET_IMAGE_AMOUNT_LOADING,
    payload: boolean
}

interface SetImageAmountMax {
    type: typeof SET_IMAGE_AMOUNT_MAX,
    payload: boolean
}

interface SetLoadingOffer {
    type: typeof SET_LOADING_OFFER,
    payload: boolean
}

interface SetImageLinks {
    type: typeof SET_IMAGE_LINKS,
    payload: string[],
    payload2: null
}

interface DeleteOfferSuccess {
    type: typeof DELETE_OFFER_SUCCESS,
    payload: boolean,
    payload2: boolean
}

interface DeleteOfferLoading {
    type: typeof DELETE_OFFER_LOADING,
    payload: boolean
}

interface DeleteOfferFailure {
    type: typeof DELETE_OFFER_FAILURE,
    payload: boolean
}

interface UpdateOfferSuccess {
    type: typeof UPDATE_OFFER_SUCCESS,
    payload: boolean,
    payload2: boolean
}

interface UpdateOfferLoading {
    type: typeof UPDATE_OFFER_LOADING,
    payload: boolean
}

interface UpdateOfferFailure {
    type: typeof UPDATE_OFFER_FAILURE,
    payload: boolean
}

interface SetCreateSuccess {
    type: typeof SET_CREATE_SUCCESS,
    payload: boolean
}

interface SetUpdateSuccess {
    type: typeof SET_UPDATE_SUCCESS,
    payload: boolean
}

interface SetDelSuccess {
    type: typeof SET_DEL_SUCCESS,
    payload: boolean
}

interface GetMsgs {
    type: typeof GET_MSGS,
    payload: Message[]
}

interface SetOffersIds {
    type: typeof SET_OFFERS_IDS,
    payload: string[]
}

interface SetImageNames{
    type: typeof SET_IMAGE_NAMES,
    payload: string[]
}

interface SetFilters{
    type: typeof SET_FILTER,
    payload: Rent[]
}

interface ListConversations{
    type: typeof LIST_CONVERSATIONS,
    payload: []
}

interface setImageSuccess{
    type: typeof SET_IMAGE_SUCCESS,
    payload: boolean
}

//Offer Actions
export type offerAction =
    setImageSuccess |
    ListConversations |
    SetFilters |
    SetImageNames |
    SetOffersIds |
    GetMsgs |
    SetDelSuccess |
    UpdateOfferFailure |
    UpdateOfferLoading |
    UpdateOfferSuccess |
    SetCreateSuccess |
    SetUpdateSuccess |
    SetImageLinks |
    SetLoadingOffer |
    SetImageAmount |
    SetImageAmountLoading |
    SetImageAmountMax |
    ListOfferFailure |
    ListOfferLoading |
    ListOfferSuccess |
    CreateOfferFailure |
    CreateOfferLoading |
    CreateOfferSuccess |
    DeleteOfferFailure |
    DeleteOfferLoading |
    DeleteOfferSuccess |
    SetImages |
    SetRooms |
    SetRoomType |
    SetRoomSize |
    SetLocation;