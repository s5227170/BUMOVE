import React, { FC, Fragment } from 'react';

import classes from './ErrorMessage.module.scss';

interface Props{
    error?: string
}

const ErrorMessage: FC<Props> = ({error}) => {
    return (
        <Fragment>
            {error?
                <div className={classes['error-message']}>
                    <p>{error}</p>
                </div>
                :
                null
            }
        </Fragment>
    );
}

export default ErrorMessage;