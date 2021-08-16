import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import classes from './Message.module.scss';

interface Props {
    createdAt?: any,
    content?: string,
    displayName: string,
    avatar: string,
    uid?: string,
}

const Message: FC<Props> = ({ createdAt, content, displayName, avatar, uid }) => {
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <Fragment>

            {//@ts-ignore
                displayName != user!._id ?
                    <div className={classes.messageA}>
                        <img src={avatar} />
                        <p>{content}</p>
                    </div>
                    :
                    <div className={classes.messageH}>
                        <p>{content}</p>
                        <img src={avatar} />
                    </div>
            }
        </Fragment>
    );
}

export default Message;