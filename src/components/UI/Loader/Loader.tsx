import { FC, Fragment } from 'react';

import classes from './Loader.module.scss';

const Loader: FC = () => {
    return (
        <Fragment>
            <div className={classes['loader-backdrop']}></div>
            <div className={classes['loader-container']}>
                <div className={classes.loader}>Loading...</div>
                <h3>Loading...</h3>
            </div>
        </Fragment>
    );
}

export default Loader;