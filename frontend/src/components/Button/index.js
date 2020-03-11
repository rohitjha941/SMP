import React from 'react';

import styles from './Button.module.scss';

function WrappedComponent(props) {
    return (
        <button 
            className={ 
                (props.type === 'disabled' ? (styles.disabled) : false || props.type ==='outline' ? (styles.outline) : false || (styles.solid) ) 
                + ' ' + props.className
            }
            type={props.type}
            onClick = {props.onClick} >
            {props.text}
        </button>
    )
}

const Button = React.memo(WrappedComponent);
export default Button;