import React from 'react';

import styles from './Text.module.scss';

var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

function WrappedComponent(props) {
    const metadata = props.metadata;
    // console.log(props.text)
    // console.log(stringToHTML(props.text))
    return (
        <div className={props.type==='side' ? styles.sideContainer : styles.container}>
            {props.headingTop ? null :
                <h3 className={
                    props.type === 'xl' ? styles.headingxl : null ||
                    props.type === 'lg' ? styles.headinglg : null ||
                    props.type === 'sm' ? styles.headingsm : null ||
                    props.type === 'side' ? styles.headingSide : null ||
                                        styles.headingmd
                    }>
                    {props.heading ? props.heading : null}
                </h3>
            }
            {props.type !=='side' && metadata ? 
                    (<p className={styles.metadata}>
                        {( metadata.d1 ? metadata.d1 : null ) + ( metadata.d2 ? (' • '+metadata.d2) : null ) + ( metadata.d3 ? (' • '+metadata.d3) : null )}
                    </p>)
                    :
                    null
            }
            <div className={ props.type==='side' ? styles.textSide : styles.text} >
                <div dangerouslySetInnerHTML={{__html:props.text}}></div>
                <a href={'/events/view/'+ props.event_id} className={styles.readMore}>
                    {props.text  ? '...Read More' : null }
                </a>
            </div>
            {
                props.type==='side' && metadata ? 
                    (<p className={ props.type==='side' ? styles.metaSide : styles.metadata}>
                        {( metadata.d1 ? metadata.d1 : null ) + ( metadata.d2 ? (' • '+metadata.d2) : null ) + ( metadata.d3 ? (' • '+metadata.d3) : null )}
                    </p>)
                    :
                    null
            }
        </div>
    )
}

const Text = React.memo(WrappedComponent);
export default Text;