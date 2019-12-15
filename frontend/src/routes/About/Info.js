import React, {Component} from 'react';

import ImageText from 'components/ImageText';
import infoImage from 'assets/images/guide.png';

import styles from './About.module.scss';

export default class Info extends Component {
    render() {
        const heading = "Guiding at every step";
        // eslint-disable-next-line no-multi-str
        const info = "Every fresher joining the institute is assigned a mentor \
                    (a student of 3/4th year) who they can approach with queries \
                    on any issue like academics, extracurricular, personal life or \
                    anything whatsoever about general life. The mentor is more \
                    experienced and makes use of that experience in a facilitative \
                    way to support the development of the mentee."
        return (
            <div className={styles.infoContainer}>
                < ImageText
                    imgSrc={infoImage}
                    heading={heading}
                    text={info}
                />
            </div >
        )
    }
}