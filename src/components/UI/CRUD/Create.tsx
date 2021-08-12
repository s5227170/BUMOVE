import React, { ChangeEvent, FC, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import RoomGenerator from '../RoomGenerator/RoomGenerator';
import useMap from '../../../hooks/Map/useMap';
import classes from './stylesheets/Create.module.scss';
import { createoffer, setimageamount, setimagelinks, setimages, setimagesuccess, setloadingoffer, setcreatesuccess, setroomcount } from '../../../store/actions/offerActions';
import Uploader from '../Uploader/Uploader';
import InputV2 from '../InputV2/InputV2';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setoffer } from '../../../store/actions/UIActions';
import { v4 as uuid } from 'uuid';
import Loader from '../Loader/Loader';

const Create: FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { images } = useSelector((state: RootState) => state.offers);
    const { rooms } = useSelector((state: RootState) => state.offers);
    const { imageSuccess } = useSelector((state: RootState) => state.offers);
    const { location } = useSelector((state: RootState) => state.offers);
    const { loading } = useSelector((state: RootState) => state.offers);
    const { imageNames } = useSelector((state: RootState) => state.offers);
    const { imageLinks } = useSelector((state: RootState) => state.offers);
    const { imageAmount } = useSelector((state: RootState) => state.offers);
    const { successCreate } = useSelector((state: RootState) => state.offers);
    const Map = useMap();

    const [roomQty, setRoomQty] = useState(0);
    const [roomRefresh, setRoomRefresh] = useState(0)
    const [ActiveInactive, setActiveInactive] = useState(true);

    const [rent, setRent] = useState({
        id: uuid(),
        //@ts-ignore
        author: user!._id,
        title: "",
        type: "",
        price: 0,
        information: "",
        status: "Active",
        date: new Date
    });

    useEffect(() => {
        if (successCreate == true) {
            dispatch(setmodalstyle(false))

            setTimeout(() => {
                dispatch(setcreatesuccess(false));
                dispatch(setmodal(false));
                dispatch(setbackdrop(false));

                return () => {
                    dispatch(setoffer(null, ""));
                    dispatch(setloadingoffer(false));
                    dispatch(setmodaltype(""));
                    dispatch(setimages(null));
                    dispatch(setimagelinks([], []));
                    dispatch(setimageamount(0, 0));
                    dispatch(setroomcount(0));
                    dispatch(setconvo(null));
                    dispatch(setimagesuccess(false))
                }
            }, 750);

        }
    }, [successCreate])

    const closeHandler = () => {
        dispatch(setmodal(false));
        dispatch(setbackdrop(false));
        setTimeout(() => {

            dispatch(setmodalstyle(true))
            return () => {
                dispatch(setoffer(null, ""));
                dispatch(setloadingoffer(false));
                dispatch(setmodaltype(""));
                dispatch(setimages(null));
                dispatch(setimagelinks([], []));
                dispatch(setimageamount(0, 0));
                dispatch(setroomcount(0));
                dispatch(setconvo(null));
            }

        }, 750);
    }

    useEffect(() => {
        dispatch(setroomcount(roomQty))
        setRoomRefresh(roomQty);
    }, [roomQty])


    useEffect(() => {
        dispatch(setroomcount(0));
        setRoomQty(0)
    }, [rent.type])

    useEffect(() => {
        console.log("in the useEffect")
        if (imageSuccess == true) {
            dispatch(setimagesuccess(false))
            console.log("in the useEffect and the value is positive")
            //this is all done after links are set and the linksSuccess variable is changed to true
            dispatch(setloadingoffer(true));
            //@ts-ignore
            if (user!._id && rooms && imageLinks) {
                //@ts-ignore
                dispatch(createoffer({ _id: rent.id, author: user!._id, title: rent.title, type: rent.type, price: rent.price, rooms: rooms, location: location, information: rent.information, images: imageLinks, imgnames: imageNames, status: rent.status, date: rent.date }));
            } else {
                alert("A problem occured!");
                dispatch(setloadingoffer(false))
            }

        }
    }, [imageSuccess])

    const roomsHandler = (e: FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setRoomQty(+e.currentTarget.value);
    }

    const typeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setRent({ ...rent, type: e.currentTarget.value });
    }

    const activeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!ActiveInactive) {
            setActiveInactive(true)
            setRent({ ...rent, status: "Active" })
        } else {
            setRent({ ...rent, status: "Active" })
        }
    }

    const inactiveHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (ActiveInactive) {
            setActiveInactive(false)
            setRent({ ...rent, status: "Inactive" })
        } else {
            setRent({ ...rent, status: "Inactive" })
        }
    }

    function isWholeNumber(num: number) {
        return num === Math.round(num);
    }

    const submitHandler = async () => {
        if (rent.title == "" || !rent.type || !rent.price || rooms == [] || location == { lat: 50.721680, lng: -1.878530 } || rent.information === "") {
            alert("Please fill all fields");
        } else if (rent.price < 1 || rent.price > 2000) {
            alert("The price " + rent.price + " is outside of the allowed scope. Properties must have between 1 and 2000 pound range")
        } else if (!isWholeNumber(rent.price)) {
            alert("Please enter a whole number amount");
        } else if (rent.title == "") {
            alert("Please enter a title!");
            //@ts-ignore
        } else if (rooms?.length == 0) {
            alert("Please set the type and size of all rooms or reset them completely by chaning the number of rooms!");
        } else if (location == { lat: 50.721680, lng: -1.878530 }) {
            alert("Please enter the property location on the map!");
        } else if (imageAmount == 0) {
            alert("Please upload images to the offer!")
        } else {
            //ADD IMAGE HANDLING FOR FIREBASE HERE AND THEN SUBMIT THE OFFER BY USING dispatch(setready(true))
            //@ts-ignore
            if (images.length != imageLinks)
                dispatch(setimagelinks(images, imageAmount))
        }
    }

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRent({ ...rent, title: e.currentTarget.value })
    }

    const priceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRent({ ...rent, price: +e.currentTarget.value })
    }

    const infoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRent({ ...rent, information: e.currentTarget.value })
    }


    return (
        <section className={classes.section}>
            {loading ?
                <Loader />
                :
                null
            }
            <div className={classes.head}>
                <h1>Create your Offer</h1>
            </div>
            <hr className={classes.underline}></hr>
            <div className={classes.content}>
                <div className={classes.col1}>
                    <h3>Please fill all fields in order for the form to be submittable</h3>
                    <InputV2 inputCasingStyleID={""} type="text" content={"Title"} placeholder="Title" required onChange={titleHandler} />
                    <InputV2 pound inputCasingStyleID={""} type="number" content={"PPM"} step={1} min={1} max={5000} placeholder="PPM" required onChange={priceHandler} />
                    <div className={classes.status}>
                        <h4>Active offer:</h4>
                        <input id="status-input" type="checkbox" onChange={activeHandler} checked={ActiveInactive} />
                        <label htmlFor={"status-input"}>Active</label>

                        <input id="status-input" type="checkbox" onChange={inactiveHandler} checked={!ActiveInactive} />
                        <label htmlFor={"status-input"}>Inactive</label>
                    </div>
                    <select className={classes.type} required onChange={typeHandler}>
                        <option defaultValue={""} hidden>Type</option>
                        <option value={"Room"}>Room</option>
                        <option value={"Flat"}>Flat</option>
                        <option value={"House"}>House</option>
                    </select>
                    {rent.type == "Room" ?
                        <select className={classes.rooms} required onChange={roomsHandler}>
                            <option defaultValue={0} hidden>Amount</option>
                            <option value={1}>1</option>
                        </select>
                        :
                        //@ts-ignore
                        <select className={classes.rooms} required onChange={roomsHandler} disabled={rent.type == ""}>
                            <option defaultValue={0}>Rooms</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    }
                    <div className={classes["rooms-container"]}>
                        {rent.type == "" ?
                            null
                            :
                            !roomQty ?
                                null
                                :
                                <Fragment>
                                    <h5>Room set-up</h5>
                                    <RoomGenerator qty={roomRefresh} />
                                </Fragment>

                        }
                    </div>
                    <h5>Information</h5>
                    <textarea rows={7} cols={35} placeholder="Enter information about your property" onChange={infoHandler}>

                    </textarea>
                    <div className={classes.map}>
                        {Map}
                    </div>
                    <Uploader />

                </div>
                <div className={classes.col3}>
                    <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                        cancel_presentation
                    </span>
                </div>
            </div>
            <div className={classes['form-submit']}>
                <button className={classes.submit} onClick={submitHandler}>submit</button>
            </div>
        </section>
    );
}

export default Create;