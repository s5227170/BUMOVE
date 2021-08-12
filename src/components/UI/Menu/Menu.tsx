import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from '../../../store/actions/authActions';
import classes from './Menu.module.scss';
import { RootState } from '../../../store';
import logo from '../../../static/images/logo.png';
import { setbackdrop, setmodal, setmodaltype } from '../../../store/actions/UIActions';

const Menu: FC = () => {
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { modalType } = useSelector((state: RootState) => state.UI);
    const { page } = useSelector((state: RootState) => state.UI);

    const logoutClickHandler = () => {
        dispatch(signout());
    }

    const messageHandler = () => {
        dispatch(setmodaltype("Message"));
        dispatch(setmodal(true));
        dispatch(setbackdrop(true));
    }

    const profileHandler = () => {
        dispatch(setmodaltype("Profile"));
        dispatch(setmodal(true));
        dispatch(setbackdrop(true));
    }

    return (
        <div className={classes.section}>
            <div className={classes['logo-container']}>
                <NavLink to="/" className={classes['logo-link']}>
                    <img className={classes.logo} src={logo} alt="logo" />
                </NavLink>
            </div>
            <div className={classes.links}>
                {authenticated ?
                    <NavLink activeClassName={modalType == "Profile"? classes.active : ""} to="" onClick={profileHandler}>My Profile</NavLink>
                    :
                    null}
                {page == "/" ?
                    <NavLink activeClassName={modalType == "Message" || modalType == "Chat" || modalType == "Profile"? "" : classes.active} to="/" >Offers</NavLink>
                    :
                    <NavLink to="/" >Offers</NavLink>}
                {authenticated ?
                    <NavLink activeClassName={modalType == "Message"? classes.active : ""} to="" onClick={messageHandler}>Messages</NavLink>
                    :
                    null}
                <NavLink to="" onClick={logoutClickHandler}>SignOut</NavLink>
            </div>
        </div>
    );
}

export default Menu;
