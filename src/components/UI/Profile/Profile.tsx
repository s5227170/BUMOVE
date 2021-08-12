import firebase from 'firebase';
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OutputFileType } from 'typescript';
import { RootState } from '../../../store';
import { setavatar, setbackdrop, setmodal, setmodalstyle, setmodaltype } from '../../../store/actions/UIActions';

import unknown from '../../../static/images/unknown.jpg';
import classes from './Profile.module.scss';
import { User } from '../../../store/types';

const Profile: FC = () => {
    const dispatch = useDispatch();
    const { avatar } = useSelector((state: RootState) => state.UI);
    const { user } = useSelector((state: RootState) => state.auth);
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [choice, setChoice] = useState("")
    const [file, setFile] = useState<any>(null)
    const [liveAvatar, setLiveAvatar] = useState<User>();

   // const db = firebase.firestore().collection('users');

    //Add a useEffect and make a search for the avatar with this current user's id
    //if there is no such, use the unknown image.
    //The avatar change should be able to "SET" the object if it exists or "ADD" it
    //if it doesn't

    useEffect(() => {
        
    }, [avatar])

    useEffect(() => {
        

    }, [])

    useEffect(() => {
        if (document.getElementById('avatarPreview')) {
            //@ts-ignore
            document.getElementById('avatarPreview').src = window.URL.createObjectURL(file);
        }
    }, [file])

    const changePassword = (currentPassword: string, newPassword: string) => {
        reauthenticate(currentPassword).then(() => {
            let user = firebase.auth().currentUser;
            user!.updatePassword(newPassword).then(() => {
                alert("Password Changed!")
                setChoice("")
            }).catch((error) => { console.log(error); });
        }).catch((error: string) => { console.log(error); });
    }

    const changeEmail = (currentPassword: string, newEmail: string) => {
        reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user!.updateEmail(newEmail).then(() => {
                alert("Email Changed!")
                setChoice("")
            }).catch((error) => { console.log(error); });
        }).catch((error: string) => { console.log(error); });
    }

    const reauthenticate = (currentPassword: string) => {
        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user!.email!, currentPassword);
        return user!.reauthenticateWithCredential(cred);
    }

    const closeHandler = () => {
        dispatch(setmodalstyle(true))

        setTimeout(() => {
            dispatch(setmodal(false));
            dispatch(setbackdrop(false));
            dispatch(setmodaltype(""));
          }, 750);
    }

    const currentPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.currentTarget.value);
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const repeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.currentTarget.value);
    }

    const avatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }

    const submitPasswordHandler = () => {

        changePassword(currentPassword, password)
    }

    const submitEmailHandler = () => {
        changeEmail(currentPassword, email);
    }

    const submitAvatarHandler = () => {
        if (file)
            dispatch(setavatar(file))
    }

    return (
        <Fragment>
            <div className={classes.profile}>
                <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                    cancel_presentation
                </span>
                <div className={classes.row1}>
                    <div className={classes.col1}>
                        <img src={liveAvatar ? liveAvatar.avatar : unknown} />
                    </div>
                    <div className={classes.col2}>
                        <label>Email:</label>
                        {/* @ts-ignore */}
                        <p>{user?.email}</p>
                        <label>Name:</label>
                        {/* @ts-ignore */}
                        <p>{user?.name}</p>
                    </div>
                </div>
                <div className={classes.row2}>
                    <div className={classes.col1}>
                        <button onClick={e => setChoice("password")}>Change password</button>
                        <button onClick={e => setChoice("avatar")}>Change Avatar</button>
                        <button onClick={e => setChoice("email")}>Change email</button>
                    </div>
                    <div className={classes.col2}>
                        <div className={classes.lines}>
                            <hr></hr>
                            {choice == "password" ?
                                <div className={classes.change}>
                                    <label>Enter current password</label>
                                    <input type="password" value={currentPassword} onChange={currentPasswordHandler} />
                                    <label>Enter new password</label>
                                    <input type="password" value={password} onChange={passwordHandler} />
                                    <label>Repeat password</label>
                                    <input type="password" value={repeatPassword} onChange={repeatPasswordHandler} />
                                    <button className={classes.submit} onClick={submitPasswordHandler} disabled={password == "" || password != repeatPassword}>Submit</button>
                                </div>
                                :
                                choice == "avatar" ?
                                    <div className={classes.change}>
                                        <input type="file" onChange={avatarHandler} />
                                        <img id="avatarPreview" src={file ? avatar : unknown} />
                                        <button className={classes.submit} onClick={submitAvatarHandler} disabled={file == null}>Submit</button>
                                    </div>
                                    :
                                    <div className={classes.change}>
                                        <label>Enter current password</label>
                                        <input type="password" value={currentPassword} onChange={currentPasswordHandler} />
                                        <label>Enter new email</label>
                                        {/* @ts-ignore */}
                                        <input type="text" onChange={emailHandler} value={user!.email} />
                                        <button className={classes.submit} onClick={submitEmailHandler} disabled={email == ""}>Submit</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
