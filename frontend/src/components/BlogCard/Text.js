import React from 'react';

import styles from './Text.module.scss';

function WrappedComponent(props) {
    const metadata = props.metadata;
    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>
                {props.heading ? props.heading : null}
            </h3>
            {metadata ? 
                    (<p className={styles.metadata}>
                        {( metadata.d1 ? metadata.d1 : null ) + ( metadata.d2 ? (' • '+metadata.d2) : null ) + ( metadata.d3 ? (' • '+metadata.d3) : null )}
                    </p>)
                    :
                    null
            }
            <p className={styles.text}>
                {props.text ? props.text : null}
            </p>
        </div>
    )
}

const CompositeTextView = React.memo(WrappedComponent);
export default CompositeTextView;