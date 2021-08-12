import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/SignUp.module.scss';
import { setpage } from '../../store/actions/UIActions';

const SignUp: FC = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
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
        dispatch(setpage("SignUp"));
    }, []);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signup({ email, password, name }, () => setLoading(false)));
    }

    return (
        <section className={classes.section}>
            <div>
                <h2>Sign up</h2>
                <form className={classes.form} onSubmit={submitHandler}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.currentTarget.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        name="password"
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.currentTarget.value)}
                        placeholder="Repeat Password"
                    />
                    <div className={classes['submit-container']}>
                        <button className={classes.submit} disabled={loading && password != passwordRepeat}>{loading ? "Loading..." : "Sign up"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignUp;