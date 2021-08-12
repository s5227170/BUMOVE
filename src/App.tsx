import React, { Fragment, useEffect } from 'react';
import { getUser, setLoading, setNeedVerification } from './store/actions/authActions';
import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';

import Header from './components/pages/Header';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import Footer from './components/pages/Footer';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import firebase from './firebase/config';
import PublicRoute from './components/auth/PublicRoute';
import MultiRoute from './components/auth/MultiRoute';
import Loader from './components/UI/Loader/Loader';
import agent from './api/agent';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {

    if(!user){
    dispatch(getUser())
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <MultiRoute path="/Dashboard" component={Homepage} exact />
          <MultiRoute path="/" component={Homepage} exact />
          <PublicRoute path="/Signup" component={SignUp} exact />
          <PublicRoute path="/Signin" component={SignIn} exact />
          <PublicRoute path="/ForgotPassword" component={ForgotPassword} exact />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
