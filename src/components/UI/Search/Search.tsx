import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import classes from './Search.module.scss';

const Search: FC = () => {
    const { modalStyle } = useSelector((state: RootState) => state.UI);
    const { rents, rentsID } = useSelector((state: RootState) => state.offers);

    const [ min, setMin ] = useState(0);
    const [ max, setMax ] = useState(0);
    const [ type, setType ] = useState("");
    const [ rooms, setRooms ] = useState(0);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("")

    const searchHandler = () => {
        
    }

    const keywordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.currentTarget.value);
        setDescription(e.currentTarget.value);
    }

    const minHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setMin(+e.currentTarget.value);
    }

    const maxHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setMax(+e.currentTarget.value);
    }

    const typeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setType(e.currentTarget.value);
    }

    const roomsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setRooms(+e.currentTarget.value)
    }

    return (
        <div id={classes["search-responsive"]} className={classes["form-container"]}>
                    <div className={classes["search-container"]}>
                        <label>Search by keyword</label>
                        <input onChange={keywordHandler} className={classes["search-field"]} placeholder="Enter a keyword" />
                        <span id={classes["search-icon"]} className="material-icons">
                            search
                            </span>
                    </div>
                    {/* The idea of the form bellow is to hide whenever somebody searches and to pop the search menu under the picture */}
                    <form className={classes.form}>
                        <div className={classes["col1"]}>
                            <label>Min Price</label>
                            <div className={classes["custom-select"]}>
                                <select required onChange={minHandler}>
                                    <option defaultValue={100}>100</option>
                                    <option defaultValue={200}>200</option>
                                    <option defaultValue={300}>300</option>
                                </select>
                                <span className={classes["custom-arrow"]}></span>
                            </div>
                            <label>Max Price</label>
                            <div className={classes["custom-select"]}>
                                <select onChange={maxHandler}>
                                    <option defaultValue={100}>100</option>
                                    <option defaultValue={200}>200</option>
                                    <option defaultValue={300}>300</option>
                                </select>
                                <span className={classes["custom-arrow"]}></span>
                            </div>
                        </div>
                        <div className={classes["col2"]}>
                            <label>Property type</label>
                            <div className={classes["custom-select"]}>
                                <select required onChange={typeHandler}>
                                    <option defaultValue={"House"}>House</option>
                                    <option defaultValue={"Flat"}>Flat</option>
                                    <option defaultValue={"Room"}>Room</option>
                                </select>
                                <span className={classes["custom-arrow"]}></span>
                            </div>
                            <label>Rooms</label>
                            <div className={classes["custom-select"]}>
                                <select onChange={roomsHandler}>
                                    <option defaultValue={1}>1</option>
                                    <option defaultValue={2}>2</option>
                                    <option defaultValue={3}>3</option>
                                    <option defaultValue={4}>4</option>
                                    <option defaultValue={5}>5</option>
                                    <option defaultValue={6}>6</option>
                                    <option defaultValue={7}>7</option>
                                    <option defaultValue={8}>8</option>
                                    <option defaultValue={9}>9</option>
                                    <option defaultValue={10}>10</option>
                                </select>
                                <span className={classes["custom-arrow"]}></span>
                            </div>
                        </div>
                    </form>
                    <button className={classes.submit} onClick={searchHandler}>Search</button>
                </div>
    );
}

export default Search;







