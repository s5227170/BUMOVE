import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setimageamount, setimagelinks, setimages, setloadingoffer, setcreatesuccess, setroomcount, setupdatesuccess } from '../../../store/actions/offerActions';
import { setbackdrop, setconvo, setmodal, setmodalstyle, setmodaltype, setoffer } from '../../../store/actions/UIActions';

import classes from './Backdrop.module.scss';

const Backdrop: FC = () => {
    const dispatch = useDispatch();
    const { backdrop } = useSelector((state: RootState) => state.UI);
    const { showModal } = useSelector((state: RootState) => state.UI)
    const { successCreate, successUpdate } = useSelector((state: RootState) => state.offers);

    const backdropHandler = () => {
        if (successCreate == true) {
            dispatch(setmodalstyle(false))

            setTimeout(() => {
                dispatch(setcreatesuccess(false));
                dispatch(setbackdrop(!backdrop))
                dispatch(setmodal(!showModal))

                return () => {
                    dispatch(setoffer(null, ""))
                    dispatch(setloadingoffer(false))
                    dispatch(setmodaltype(""))
                    dispatch(setimages(null))
                    dispatch(setimagelinks([], []))
                    dispatch(setimageamount(0, 0))
                    dispatch(setroomcount(0))
                    dispatch(setconvo(null));
                }
                
            }, 750);
        } else if(successUpdate == true) {
            dispatch(setmodalstyle(false))

            setTimeout(() => {
                dispatch(setupdatesuccess(false));
                dispatch(setbackdrop(!backdrop))
                dispatch(setmodal(!showModal))

                return () => {
                    dispatch(setoffer(null, ""))
                    dispatch(setloadingoffer(false))
                    dispatch(setmodaltype(""))
                    dispatch(setimages(null))
                    dispatch(setimagelinks([], []))
                    dispatch(setimageamount(0, 0))
                    dispatch(setroomcount(0))
                    dispatch(setconvo(null));
                }
                
            }, 750);
        } else {
            dispatch(setmodalstyle(true))

            setTimeout(() => {
                dispatch(setbackdrop(!backdrop))
                dispatch(setmodal(!showModal))

                return () => {
                    dispatch(setoffer(null, ""))
                    dispatch(setloadingoffer(false))
                    dispatch(setmodaltype(""))
                    dispatch(setimages(null))
                    dispatch(setimagelinks([], []))
                    dispatch(setimageamount(0, 0))
                    dispatch(setroomcount(0))
                    dispatch(setconvo(null));
                }
                
            }, 750);
        }
    }

    return (
        <div className={classes.Backdrop} onClick={backdropHandler} >
        </div>
    );
}

export default Backdrop;