import React from 'react';
import styles from './MentorCard.module.scss';
import arrow from 'assets/images/down-arrow-2.svg';

function WrappedComponent(props) {
    const mentor = props.profile.image;
    const name = props.profile.name;
    const branchShort = props.profile.branchShort;
    const year = props.profile.year;
    const skills = props.profile.skills;
        return ( 
            <>
            <div className={styles.container + ' ' + props.className}>
                <ul>
                    <li className={styles.imageParent}>
                        <img className={styles.image} src={mentor} alt='mentor'/>
                    </li>
                    <li className={styles.mentorDetails}>
                    <img className={styles.arrow} src={arrow} alt='more' />
                        <p className={styles.name}>{name}</p>
                        <p className={styles.meta}>{branchShort + ' • ' + year + ' Year'}</p>
                        <p className={styles.skills}>{skills.map((skill,i) => {
                            return(
                                (i ? ' • ' : '') +skill
                            )
                        })}</p>
                    </li>
                </ul>
            </div>
            </>
         );
}
 
export default React.memo(WrappedComponent);