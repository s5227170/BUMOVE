import { ThunkAction } from 'redux-thunk';

import { SignUpData, AuthAction, SET_USER, User, SET_LOADING, SIGN_OUT, SignInData, SET_ERROR, NEED_VERIFICATION, SET_SUCCESS, SET_AUTH_MESSAGE_CHECK } from '../types';
import { RootState } from '..';
import firebase from '../../firebase/config';
import agent from '../../api/agent';

// Create user
export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const signUpUser = await agent.authentication.signUp(data.email, data.password, data.name);
            if (signUpUser.data.signUp) {
                dispatch({
                    type: SET_USER,
                    payload1: signUpUser.data.signUp,
                    payload2: signUpUser.data.signUp.admin,
                    payload3: true
                });
                dispatch({
                    type: SET_SUCCESS,
                    payload: "Registration successful!"
                })
            }
        } catch (err) {
            console.log(err);
            onError();
            dispatch({
                type: SET_ERROR,
                payload: err.Message
            });
        }
    }
}

// Get user by id
export const getUser = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            //create a web socket and connectthe user to the BE for real-time authentication
            const user = await agent.authentication.user()
            if (user.data.user) {
                dispatch({
                    type: SET_USER,
                    payload1: user.data.user,
                    payload2: user.data.user.admin,
                    payload3: true
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

//Loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        })
    }
}

// Log in
export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const loginUser = await agent.authentication.signIn(data.email, data.password)
            const User = await agent.authentication.user();
            console.log(User.data.user)
            if(User.data.user){
                dispatch({
                    type: SET_USER,
                    payload1: User.data.user,
                    payload2: User.data.user.admin,
                    payload3: true
                });
                dispatch({
                    type: SET_SUCCESS,
                    payload: "Login successful!"
                });
                dispatch({
                    type: SET_AUTH_MESSAGE_CHECK,
                    payload: true
                })
            }            
        } catch (err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: true
            });
            document.cookie = "access-token" + '=; Max-Age=0' 
            document.cookie = "refresh-token" + '=; Max-Age=0' 
                dispatch({
                    type: SET_SUCCESS,
                    payload: "Logout successful!"
                })
                dispatch({
                    type: SIGN_OUT
                });
                dispatch({
                    type: SET_AUTH_MESSAGE_CHECK,
                    payload: true
                });
        } catch (err) {
            console.log(err);
            dispatch({
                type: SET_LOADING,
                payload: true
            });
        }
    }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        })
    }
}

// Set need verification
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: NEED_VERIFICATION
        });
    }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        })
    }
}

// Send password reset email
export const sendPasswordResetEmail = (email: string, successMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await firebase.auth().sendPasswordResetEmail(email).then(() => {
                dispatch({
                    type: SET_SUCCESS,
                    payload: "Reset email sent!"
                });
            })
        } catch (err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

export const setauthchecked = (check: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch =>{
        try {
            dispatch({
                type: SET_AUTH_MESSAGE_CHECK,
                payload: check
            })
        } catch (e) {

        }
    }
}
