import { FC, Fragment, InputHTMLAttributes } from 'react';

import classes from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    content: string;
    inputCasingStyleID: string;
    pound?: boolean;
}

const Input: FC<Props> = ({ disabled, id, inputCasingStyleID, type, value, name, step, onBlur, onChange, content, pound }) => {
    return (
        <div id={inputCasingStyleID} className={classes['inputv1-wrapper']}>

            {pound && type == "number" ?
                <div className={classes.num}>
                    <label className={classes.label}>{content}</label>
                    <label className={classes.pound}>£</label>
                    <input
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        required
                        step={step}
                        disabled={disabled}
                    />
                </div>
                :
                <Fragment>
                    <label className={classes.label}>{content}</label>
                    <input
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        required
                        step={step}
                        disabled={disabled}
                    />
                </Fragment>
            }
            <hr className={classes.underline}></hr>
        </div>
    );
}

export default Input;