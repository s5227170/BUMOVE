import React, { ChangeEvent, FC, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';


import Uploader from '../Uploader/Uploader';
import { v4 as uuid } from 'uuid';
import classes from './stylesheets/Update.module.scss';
import InputV2 from '../InputV2/InputV2';
import useMap from '../../../hooks/Map/useMap';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setoffer } from '../../../store/actions/UIActions';
import { setimageamount, setimagelinks, setimages, setimagesuccess, setloadingoffer, setupdatesuccess, setroomcount, updateoffer } from '../../../store/actions/offerActions';
import RoomGenerator from '../RoomGenerator/RoomGenerator';


const Update: FC = () => {
    const dispatch = useDispatch();
    const Map = useMap();
    const { user } = useSelector((state: RootState) => state.auth);
    const { toUpdate } = useSelector((state: RootState) => state.UI)
    const { offer } = useSelector((state: RootState) => state.UI)
    const { rooms } = useSelector((state: RootState) => state.offers);
    const { location } = useSelector((state: RootState) => state.offers);
    const { imageSuccess } = useSelector((state: RootState) => state.offers);
    const { images } = useSelector((state: RootState) => state.offers);
    const { imageLinks } = useSelector((state: RootState) => state.offers);
    const { imageAmount } = useSelector((state: RootState) => state.offers);
    const { successUpdate } = useSelector((state: RootState) => state.offers);
    const [currentImg, setCurrentImg] = useState(offer!.images[0]);
    const [index, setIndex] = useState(0);
    const [roomQty, setRoomQty] = useState(0);
    const [roomRefresh, setRoomRefresh] = useState(0)
    const [ActiveInactive, setActiveInactive] = useState(true);
    const [rent, setRent] = useState({
        _id: offer!._id,
        //@ts-ignore
        author: offer.author,
        title: offer!.title,
        type: offer!.type,
        price: offer!.price,
        information: offer!.information,
        status: offer!.status,
        images: offer!.images,
        imgnames: offer!.imgnames,
        rooms: offer!.rooms,
        location: offer!.location,
    });

    useEffect(() => {
        setRent({ ...rent, location: location })
    }, [location])

    useEffect(() => {
        if (successUpdate == true) {
            dispatch(setmodal(false));
            dispatch(setbackdrop(false));
            setTimeout(() => {
                dispatch(setupdatesuccess(false));

                dispatch(setmodalstyle(false))
                return () => {
                    dispatch(setoffer(null, ""));
                    dispatch(setloadingoffer(false));
                    dispatch(setmodaltype(""));
                    dispatch(setimages(null));
                    dispatch(setimagelinks([], []));
                    dispatch(setimageamount(0, 0));
                    dispatch(setroomcount(0));
                    dispatch(setupdatesuccess(false));
                    dispatch(setconvo(null));
                    dispatch(setimagesuccess(false))
                }
            }, 750);
        }

    }, [successUpdate])

    const closeHandler = () => {
        dispatch(setmodalstyle(true))

        setTimeout(() => {
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
                dispatch(setupdatesuccess(false));
                dispatch(setconvo(null));
            }
        }, 750);

    }

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

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRent({ ...rent, title: e.currentTarget.value })
    }

    const priceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRent({ ...rent, price: +e.currentTarget.value })
    }

    const infoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRent({ ...rent, information: e.currentTarget.value })
    }

    useEffect(() => {
        setRent({ ...rent, rooms: rooms })
    }, [rooms])

    const submitHandler = async () => {


        if (!isWholeNumber(rent.price)) {
            alert("Please enter a whole number amount");
            return
        }

        if (imageLinks == []) {
            setRent({ ...rent, images: offer!.images })
        } else {
            setRent({ ...rent, images: imageLinks })
        }

        //@ts-ignore
        if (rooms.length == 0) {
            setRent({ ...rent, rooms: offer!.rooms })
        } else if (rent.rooms.length == 0) {
            setRent({ ...rent, rooms: offer!.rooms })
        }
        else {
            setRent({ ...rent, rooms: rooms })
        }

        if (rent.title == "" || !rent.type || !rent.price || rent.rooms == [] || rent.location == { lat: 50.721680, lng: -1.878530 } || rent.information === "") {
            alert("Please fill all fields");
        } else if (rent.price < 1 || rent.price > 2000) {
            alert("The price " + rent.price + " is outside of the allowed scope. Properties must have between 1 and 2000 pound range")
        } else if (!isWholeNumber(rent.price)) {
            alert("Please enter a whole number amount");
        } else if (rent.title == "") {
            alert("Please enter a title!");
            //@ts-ignore
        } else if (rent.rooms?.length == 0) {
            if (offer!.rooms.length == 0)
                alert("Please set the rooms since there was a problem processing them.");
        } else if (location == { lat: 50.721680, lng: -1.878530 }) {
            alert("Please enter the property location on the map!");
        } else if (rent.images.length == 0) {
            alert("Please upload images to the offer!")
        } else {

            if (images) {
                //@ts-ignore
                if (images.length != imageLinks) {
                    dispatch(setimagelinks(images, imageAmount))
                }
            } else {
                dispatch(setimagelinks([], []))
            }
        }
    }

    useEffect(() => {
        if (imageSuccess == true) {
            dispatch(setimagesuccess(false))

            //this is all done after links are set and the linksSuccess variable is changed to true
            dispatch(setloadingoffer(true));
            //@ts-ignore
            if (user!._id) {
                if (rent.rooms.length == 0) {
                    dispatch(updateoffer({
                        _id: offer!._id,
                        author: offer!.author,
                        title: rent.title,
                        type: rent.type,
                        price: rent.price,
                        rooms: rent.rooms,
                        location: rent.location,
                        information: rent.information,
                        images: rent.images,
                        imgnames: rent.imgnames,
                        status: rent.status,
                    }, toUpdate));
                } else {
                    dispatch(updateoffer({
                        _id: offer!._id,
                        author: offer!.author,
                        title: rent.title,
                        type: rent.type,
                        price: rent.price,
                        rooms: offer!.rooms,
                        location: rent.location,
                        information: rent.information,
                        images: rent.images,
                        imgnames: rent.imgnames,
                        status: rent.status,
                    }, toUpdate));
                }
            } else {
                alert("A problem occured!");
                dispatch(setloadingoffer(false))
            }
        }
    }, [imageSuccess])


    useEffect(() => {
        setCurrentImg(offer!.images[index]);
    }, [index])

    useEffect(() => {
        dispatch(setroomcount(roomQty))
        setRoomRefresh(roomQty);
    }, [roomQty])

    useEffect(() => {
        dispatch(setroomcount(0));
        setRoomQty(0)
    }, [rent.type])

    useEffect(() => {
        if (images)
            dispatch(setimagelinks(images, imageLinks))
    }, [images])

    useEffect(() => {

        //@ts-ignore
        if (imageLinks.length != 0)
            setRent({ ...rent, images: imageLinks, imgnames: imageLinks })
    }, [imageLinks])

    return (
        <section className={classes.section}>
            <div className={classes.col1}>
                <h1>{offer?.title}</h1>
                <hr id={classes["head-hr"]}></hr>
                <InputV2 value={rent.title} inputCasingStyleID={""} type="text" content={"Title"} placeholder="Title" required onChange={titleHandler} />
                <InputV2 value={rent.price} pound inputCasingStyleID={""} type="number" content={"PPM"} step={1} min={1} max={5000} placeholder="PPM" required onChange={priceHandler} />
                <div className={classes.status}>
                    <h4>Active offer:</h4>
                    <input id="status-input" type="checkbox" onChange={activeHandler} checked={ActiveInactive} />
                    <label htmlFor={"status-input"}>Active</label>

                    <input id="status-input" type="checkbox" onChange={inactiveHandler} checked={!ActiveInactive} />
                    <label htmlFor={"status-input"}>Inactive</label>
                </div>
                {offer!.images ?
                    <Fragment>
                        <h5>Current Images</h5>
                        <img id={classes["main"]} src={currentImg} />
                        <div className={classes.imgs}>
                            {offer!.images.map((item, index) => {
                                return <img key={uuid()} src={item} alt={index + "img"} onClick={e => (setCurrentImg(item), setIndex(index))} />
                            })}
                        </div>
                    </Fragment>
                    :
                    null
                }
                <Uploader />
            </div>
            <div className={classes.col2}>
                <span id={classes['close']} className="material-icons md-36" onClick={closeHandler}>
                    cancel_presentation
                </span>
                <h4>Rooms will take the same old value if left unchanged</h4>
                <div className={classes.submit}>
                    <select className={classes.type} required onChange={typeHandler}>
                        <option hidden defaultValue={""}>Type</option>
                        <option value={"Room"}>Room</option>
                        <option value={"Flat"}>Flat</option>
                        <option value={"House"}>House</option>
                    </select>
                    {/* @ts-ignore */}
                    <button onClick={submitHandler} disabled={rent.title == offer!.title && rent.type == offer!.type && rent.price == offer!.price && rent.rooms == offer!.rooms && rent.location == offer!.location && rent.information == offer!.information && rent.images == offer!.images && rent.status == offer!.status && rent.date == offer!.date && imageLinks.length == 0}>Submit</button>
                    {/* Add the items from state for the offer update, also add the values of the current state to the existing states, if a state can't be saved just leave it and maybe
                     add interface notifying the user that it has to be changed manually or just make a few if-statements that check if a state has been changes, if it has use the updated
                      one, if not - use the current one( ex. offer.images, offer.rooms, offer.title, etc...) */}

                    {/* <button onClick={dispatch(deleteoffer(offer.by))}>Submit</button> */}
                </div>
                {rent.type == "Room" ?
                    <select className={classes.rooms} required onChange={roomsHandler}>
                        <option hidden defaultValue={0}>Amount</option>
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
                <div className={classes.map}>
                    {Map}
                </div>
                <div>
                    <h5>Information</h5>
                    <textarea rows={7} cols={35} value={rent.information} placeholder="Enter information about your property" onChange={infoHandler}>

                    </textarea>
                </div>
            </div>

        </section>
    );
}

export default Update;
