import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


import logo from '../../static/images/logo.png';
import Menu from '../UI/Menu/Menu';
import classes from './stylesheets/Header.module.scss';
import { RootState } from '../../store';
const Header: FC = () => {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { page } = useSelector((state: RootState) => state.UI);

    return (
        <div className={classes.section}>
            <div className={classes['logo-container']}>
                <NavLink to="/" className={classes['logo-link']}>
                    <img className={classes.logo} src={logo} alt="logo" />
                </NavLink>
            </div>
            <div>
                {!authenticated ?
                    <div className={classes.links}>
                        {page == "/" ?
                            <NavLink activeClassName={classes.active} to="/" exact>Offers</NavLink>
                            :
                            <NavLink to="/" >Offers</NavLink>}
                        {page == "SignUp" ?
                            <NavLink activeClassName={classes.active} to="/Signup" >SignUp</NavLink>
                            :
                            <NavLink className={classes.signUp} to="/Signup" >SignUp</NavLink>}
                        {page == "SignIn" ?
                            <NavLink activeClassName={classes.active} to="/Singin" >SignIn</NavLink>
                            :
                            <NavLink className={classes.signIn} to="/Signin" >SignIn</NavLink>}
                    </div>
                    :
                    <Menu />
                }
            </div>
        </div>
    );
}

export default Header;