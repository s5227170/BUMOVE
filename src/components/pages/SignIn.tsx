import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signin, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/SignIn.module.scss';
import { setpage } from '../../store/actions/UIActions';


const SignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    useEffect(() => {
        dispatch(setpage("SignIn"));
    }, []);


    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signin({ email, password }, () => setLoading(false)));
    }

    return (
        <div className={classes['section-container']}>
            <section className={classes.section}>
                <div>
                    <h2>Sign in</h2>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <input
                            type="email"
                            className={classes['sign-input']}
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className={classes['sign-input']}
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            placeholder="Password"
                        />

                        <p><NavLink to="/ForgotPassword">Forgot Password</NavLink></p>
                        <div className={classes.submit}>
                            <button className={classes.submit} disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default SignIn;