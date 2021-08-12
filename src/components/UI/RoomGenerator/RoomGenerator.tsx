import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setroomsize, setroomtype } from '../../../store/actions/offerActions';

import classes from './RoomGenerator.module.scss';

interface Props {
    qty: number,
}

const RoomGenerator: FC<Props> = ({ qty }) => {
    const dispatch = useDispatch();
    const [elements, setElements] = useState<Array<number>>([]);
    const { rooms } = useSelector((state: RootState) => state.offers);

    
    useEffect(() => {
        setElements(elements => [])
        for (let i = 0; i < qty; i++) {
            setElements(elements => [...elements, elements.push(i)])
        }

    }, [rooms, qty])

    return (
        <section className={classes.section}>
            {elements.map((item: any, index: number) => {
                const roomNumber = index
                if (index == 10) return
                return (<div className={classes.room} key={index}>
                    <label>Room {roomNumber + 1}</label>
                    <select className={classes["room-type"]} required onChange={(e) => dispatch(setroomtype(e.currentTarget.value, index, rooms))}>
                        <option defaultValue={"Bedroom"}>Bedroom</option>
                        <option defaultValue={"Bathroom"}>Bathroom</option>
                        <option defaultValue={"Living room"}>Living room</option>
                        <option defaultValue={"Kitchen"}>Kitchen</option>
                    </select>
                    {rooms ?
                        //@ts-ignore
                        item.type == "Bedroom" ?
                            <select className={classes["room-size"]} required onChange={(e) => dispatch(setroomsize(e.currentTarget.value, index, rooms))}>
                                <option defaultValue={"Single"}>Single</option>
                                <option defaultValue={"Double"}>Double</option>
                                <option defaultValue={"King-size"}>King-size</option>
                            </select>
                            :
                            <select className={classes["room-size"]} required onChange={(e) => dispatch(setroomsize(e.currentTarget.value, index, rooms))}>
                                <option defaultValue={"Small"}>Small</option>
                                <option defaultValue={"medium"}>Medium</option>
                                <option defaultValue={"Big"}>Big</option>
                            </select>
                        :
                        null
                    }
                </div>)
            })}
        </section>
    );
}

export default RoomGenerator;





