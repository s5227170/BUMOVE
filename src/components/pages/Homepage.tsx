import React, { FC, useEffect, useState } from 'react';
import { setbackdrop, setmodal, setmodalstyle, setmodaltype, setoffer, setpage } from '../../store/actions/UIActions';
import { useDispatch, useSelector } from 'react-redux';

import classes from './stylesheets/Homepage.module.scss';
import wellcome from '../../static/images/wellcome.jpg';
import Create from '../UI/CRUD/Create'
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store';
import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import { listoffers } from '../../store/actions/offerActions';
import Item from '../UI/Item/Item';
import { v4 as uuid } from 'uuid';
import View from '../UI/CRUD/View';
import Update from '../UI/CRUD/Update';
import Message from '../UI/Messages/Messages';
import ChatHead from '../UI/ChatHead/ChatHead';
import Loader from '../UI/Loader/Loader';
import Profile from '../UI/Profile/Profile';
import SuccessMessage from '../UI/SuccessMessage/SuccessMessage';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import Search from '../UI/Search/Search';
import { setauthchecked } from '../../store/actions/authActions';

const Homepage: FC = () => {
    const dispatch = useDispatch();

    const { user, successAuth, error, authChecked } = useSelector((state: RootState) => state.auth);
    const { showModal, backdrop, modalType, modalStyle } = useSelector((state: RootState) => state.UI);
    const { rents, rentsID, successCreate, convo } = useSelector((state: RootState) => state.offers);

    const [message, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [properties, setProperties] = useState<any>();

    const createHandler = () => {
        //FIX THIS WHEN CREATE IS DONE

        if (user) {
            dispatch(setmodaltype("Create"))
            dispatch(setmodal(true));
            dispatch(setbackdrop(true));
        } else {
            alert("You need to login in order to post an offer!");
        }
    }

    const viewHandler = () => {
        dispatch(setmodaltype("View"))
        dispatch(setmodal(true));
        dispatch(setbackdrop(true));
    }

    useEffect(() => {
        dispatch(setpage("/"));
        dispatch(listoffers());
    }, []);

    useEffect(() => {
        //if(authChecked == false){
        if (successAuth != "") {
            setMessage(true)

            setTimeout(() => {
                dispatch(setauthchecked(false));
            }, 5000)
        } else {
            setMessage(false);
            setTimeout(() => {
                dispatch(setauthchecked(false));
            }, 5000)
        }
        //}
    }, [successAuth])

    useEffect(() => {
        if (modalStyle == true && showModal == false) {
            setTimeout(() => {
                dispatch(setmodalstyle(true))
            }, 700);
        } else {
            setTimeout(() => {
                dispatch(setmodalstyle(false))
            }, 700);
        }
    }, [modalStyle])

    useEffect(() => {
        if (error != "") {
            setErrorMessage(true)
        } else {
            setErrorMessage(false);
        }
    }, [error])

    useEffect(() => {
        if (rents) {
            setProperties(
                // @ts-ignore
                rents.map(item => {
                    return <Item key={item._id} click2={() => dispatch(setoffer(item, item._id))} click={viewHandler} by={item.author} date={item.createdAt} images={item.images} information={item.information} location={item.location} price={item.price} rooms={item.rooms} status={item.status} title={item.title} type={item.type} id={item._id} />
                }))
        }
    }, [rents])

    return (
        <section className={classes.section}>
            {backdrop && modalType == "Create" ?
                <Backdrop />
                :
                null
            }
            {showModal && modalType == "Create" ?
                <Modal>
                    <Create />
                </Modal>
                :
                null
            }
            {backdrop && modalType == "View" ?
                <Backdrop />
                :
                null
            }
            {showModal && modalType == "View" ?
                <Modal>
                    <View />
                </Modal>
                :
                null
            }
            {backdrop && modalType == "Update" ?
                <Backdrop />
                :
                null
            }
            {showModal && modalType == "Update" ?
                <Modal>
                    <Update />
                </Modal>
                :
                null
            }
            {backdrop && modalType == "Message" ?
                <Backdrop />
                :
                null
            }
            {showModal && modalType == "Message" ?
                <Modal>
                    <Message />
                </Modal>
                :
                null
            }
            {backdrop && modalType == "Chat" ?
                <Backdrop />
                :
                null
            }
            {showModal && modalType == "Chat" ?
                <Modal>
                    {convo?
                        // @ts-ignore
                    convo?.home && convo?._id ?
                        // @ts-ignore
                        <ChatHead id={convo!._id} home={convo!.home} away={convo.away} offerAvatar={convo.offerAvatar} rentId={convo!.rentId} texts={convo!.texts} offerName={convo.name}/>
                        :
                        <Loader />
                        :
                        null
                    }
                </Modal>
                :
                null
            }
            {backdrop && modalType == "Profile" ?
                <Backdrop />
                :
                null
            }
            {showModal && modalType == "Profile" ?
                <Modal>
                    <Profile />
                </Modal>
                :
                null
            }

            {message && authChecked ?
                <SuccessMessage success={successAuth} />
                :
                null
            }

            {errorMessage && authChecked ?
                <ErrorMessage error={successAuth} />
                :
                null
            }


            <div className={classes["wellcome-container"]}>
                <Search />
                <img className={classes.wellcome} src={wellcome} alt={wellcome} />
            </div>
            <button className={classes['create-offer']} onClick={createHandler}>+</button>
            <div className={classes.properties}>
                {properties}
            </div>
            <hr className={classes.divider}></hr>
            <div className={classes.tips}>
                <h1>Discover the best practices when it comes to rental agreements</h1>
                <img />
                <h5></h5>
                <img />
                <h5></h5>
                <img />
                <h5></h5>
                <NavLink activeClassName={classes['view-more']} to="" />
            </div>
            <div className={classes.more}>
                <button>Find an agent</button>
                <button>Calculate rental price</button>
                <button>Ask for support</button>
            </div>
            <hr className={classes.divider}></hr>
        </section>
    );
}

export default Homepage;