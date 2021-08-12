import React, { ChangeEvent, ChangeEventHandler, FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setimageamount, setimagelinks, setimages } from '../../../store/actions/offerActions';
import { v4 as uuid } from 'uuid';

import classes from './Uploader.module.scss';

const Uploader: FC = () => {
    const dispatch = useDispatch();
    const { images } = useSelector((state: RootState) => state.offers);
    const { imageAmount } = useSelector((state: RootState) => state.offers);
    const { imageMaxAmount } = useSelector((state: RootState) => state.offers);
    const { imageLinks } = useSelector((state: RootState) => state.offers);
    const { offer } = useSelector((state: RootState) => state.UI)
    const [imgs, setImgs] = useState<Array<File>>([]);
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (ready == true)
            dispatch(setimages(imgs))
    }, [ready])

    useEffect(() => {
        setReady(false)
    }, [images])

    let preview = document.querySelector(".preview");
    let preview2 = document.querySelector(".preview2");
    let cnt = 0;

    function readAndPreview(file: File) {
        // Make sure `file.name` matches our extensions criteria
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                var image = new Image();
                image.height = 100;
                image.title = uuid();
                // @ts-ignore
                image.src = this.result;
                cnt++;
                if (cnt % 2 == 0) {
                    // @ts-ignore
                    preview.appendChild(image);
                } else {
                    preview2?.appendChild(image)
                }
            }, false);

            reader.readAsDataURL(file);
        } else {
            alert("Wrong file format!");
        }

    }

    let length: number;
    let targets: FileList;
    const fileSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            targets = e.target.files
            length = e.target.files.length
        }
        if (e.target.files!.length > 10)
            return alert("Maximum amount of images is 10");
        if (imageMaxAmount)
            return alert("Maximum amount of images is 10");
        if ((imageAmount + length) > 10)
            return alert("Maximum amount of images is 10");

            console.log("the files are", e.target.files)
        //@ts-ignore
        dispatch(setimageamount(imageAmount, e.target.files?.length))
        if (e.target.files?.length == 10) {
            for (let i = 0; i < 10; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 9) {
            for (let i = 0; i < 9; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 8) {
            for (let i = 0; i < 8; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 7) {
            for (let i = 0; i < 7; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 6) {
            for (let i = 0; i < 6; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 5) {
            for (let i = 0; i < 5; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 4) {
            for (let i = 0; i < 4; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 3) {
            for (let i = 0; i < 3; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 2) {
            for (let i = 0; i < 2; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 1) {
            for (let i = 0; i < 1; i++) {
                //@ts-ignore
                setImgs(imgs => [...imgs, e.target.files[i]])
                if (i == e.target.files?.length - 1) setReady(true)
            }
            if (targets) {
                [].forEach.call(targets, readAndPreview)
            }
        }
        else if (e.target.files?.length == 0) {
            return
        }
    }

    return (

        <div className={classes.uploader}>
            <h4>Maximum of ten images are allowed at the moment</h4>
            <h6>Note that the first image that is uploaded will be the offer avatar</h6>
            {!offer?.images ?
                <div className={classes["input-wrapper"]}>
                    <input className={classes.input} onChange={fileSelectedHandler} type="file" accept="image/*" multiple disabled={imageMaxAmount} />
                </div>
                :
                <div className={classes["input-wrapper"]}>
                    <input className={classes["input-offer"]} onChange={fileSelectedHandler} type="file" accept="image/*" multiple disabled={imageMaxAmount} />
                </div>
            }
            <div id={classes['preview']} className="preview">

            </div>
            <div className={classes.break}>

            </div>
            <div id={classes['preview2']} className="preview2">

            </div>
        </div>

    );
}

export default Uploader;
