import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    sendPasswordResetEmail,
    setError,
    setSuccess,
} from "../../store/actions/authActions";
import { RootState } from "../../store";
import classes from "./stylesheets/ForgotPassword.module.scss";
import { setpage } from "../../store/actions/UIActions";

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error, successAuth } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(""));
            }
            if (successAuth) {
                dispatch(setSuccess(""));
            }
        };
    }, [error, dispatch, successAuth]);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(sendPasswordResetEmail(email, "Email Sent!"));
        setLoading(false);
    };

    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <h2>Reset password</h2>
                <form className={classes.form} onSubmit={submitHandler}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                    />
                    <button className={classes.submit} disabled={loading}>
                        {loading ? "Loading..." : "Send password reset email"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
