import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './ImageBrowser.module.scss';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../../store';

interface Props {
    images: string[]
}

const ImageBrowser: FC<Props> = ({ images }) => {
    const { offer } = useSelector((state: RootState) => state.UI)
    const [currentImg, setCurrentImg] = useState(images[0]);
    const [index, setIndex] = useState(0);
    let primary: any;

    const leftHandler = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }
    const rightHandler = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
    }

    useEffect(() => {
        setCurrentImg(images[index]);
    }, [index])

    return (
        <Fragment>
            {offer ?
                <section className={classes.section} style={offer?.images ? { "width": "22rem", "height": "15rem" } : { "width": "27rem", "height": "20rem" }}>
                    <div className={classes.current}>
                        <img src={currentImg} />
                        <span id={classes.left} className="material-icons md-60" onClick={leftHandler}>
                            navigate_before
                    </span>
                        <span id={classes.right} className="material-icons md-60" onClick={rightHandler}>
                            navigate_next
                    </span>
                    </div>
                    <div className={classes.browse}>
                        {images.map((item, index) => {
                            if(index != images.length)
                            return <img key={uuid()} src={item} alt={index + "img"} onClick={e => (setCurrentImg(item), setIndex(index))} />
                        })}
                    </div>

                </section>
                :
                null
            }
        </Fragment>
    );
}

export default ImageBrowser;