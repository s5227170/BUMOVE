import React, { FC, Fragment } from 'react';

import classes from './SuccessMessage.module.scss';

interface Props{
    success?: string
}

const SuccessMessage: FC<Props> = ({success}) => {
    return (
        <Fragment>
            {success?
                <div className={classes['success-message']}>
                    <p>{success}</p>
                </div>
                :
                null
            }
        </Fragment>
    );
}

export default SuccessMessage;