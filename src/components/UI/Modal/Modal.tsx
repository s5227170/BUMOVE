import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import classes from './Modal.module.scss';

const Modal: FC = (props) => {
    const { modalStyle } = useSelector((state: RootState) => state.UI);

    return (
        <div>
            <div className={modalStyle? classes.close : classes.Modal}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;