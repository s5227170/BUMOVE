import { FC, Fragment, useEffect, useState } from 'react';
import { coordinates, Room } from '../../../store/types';

import classes from './Item.module.scss';
import useMap from '../../../hooks/Map/useMap';
import { settodelete } from '../../../store/actions/UIActions';
import { useDispatch } from 'react-redux';

interface Props {
    id: string,
    by: string,
    date: Date,
    images: string[],
    information: string,
    location: coordinates,
    price: number,
    rooms: Room[],
    status: string,
    title: string,
    type: string,
    click: () => void;
    click2: () => void;
}
const Item: FC<Props> = ({ click, click2, by, date, images, information, location, price, rooms, status, title, type, id }) => {
    const dispatch = useDispatch();
    const [currentImg, setCurrentImg] = useState(images[0]);

    const Map = useMap("view", location);

    const combineHandler = () => {
        click()
        click2()
        dispatch(settodelete(id))
    }

    return (
        <Fragment>
            <div className={classes.wrapper} onClick={combineHandler}>
                <div className={classes.titlePrice}>
                <h2>{title}</h2>
                <h1>£{price}</h1>
                </div>
                <div className={classes.flexSet}>
                    <div className={classes.col1}>
                        <div className={classes['primary-wrapper']}>
                            <div className={classes.current}>
                                <img src={currentImg} />
                            </div>
                        </div>
                    </div>

                    <div className={classes.col2}>
                        <div className={classes.description}>
                        <h4>Property type: {type}</h4>
                        <hr></hr>
                            <p>{information}</p>
                        </div>
                    </div>

                    <div className={classes.col4}>
                        {Map}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Item;