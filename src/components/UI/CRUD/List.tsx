import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Item from '../../UI/Item/Item';
import { v4 as uuid } from 'uuid';
import { setbackdrop, setmodal, setmodalstyle, setmodaltype, setoffer, setpage } from '../../../store/actions/UIActions';

import classes from './stylesheets/List.module.scss';


const List: FC = () => {
    const dispatch = useDispatch();
    // const [properties, setProperties] = useState<any>();
    // const { rents, rentsID } = useSelector((state: RootState) => state.offers);

    // const viewHandler = () => {
    //     dispatch(setmodaltype("View"))
    //     dispatch(setmodal(true));
    //     dispatch(setbackdrop(true));
    // }

    // useEffect(() => {
    //     if (rents)
    //         setProperties(
    //             // @ts-ignore
    //             rents.map((item, index) => {
    //                 return <Item key={uuid()} click2={() => dispatch(setoffer(item))} click={viewHandler} by={item.by} date={item.date} images={item.images} information={item.information} location={item.location} price={item.price} rooms={item.rooms} status={item.status} title={item.title} type={item.type} id={rentsID[index]} />
    //             }))
    // }, [rents])

    return (
        <section className={classes.section}>
            {/* {properties} */}
        </section>
    );
}

export default List;