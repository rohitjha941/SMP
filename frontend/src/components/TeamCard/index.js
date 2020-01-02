import React from 'react';
import styles from './TeamCard.module.scss';
import fb from 'assets/images/fb.svg';
import call from 'assets/images/call.svg';

function WrappedComponent(props) {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={props.member.image} alt={props.name} />
            <div className={styles.name}>{props.member.name}</div>
            <div className={styles.designation}>{'(' + (props.member.designation) + ')'}</div>
            <div className={styles.contact}>
                <a href={props.member.fb} >
                    <div className={styles.fb}><img className={styles.commonIcon} src={fb} alt={'facebook'}/></div>
                </a>
                <a href={'tel:'+(props.member.contact)} >
                    <div className={styles.call}><img className={styles.commonIcon} src={call} alt={'phone'}/></div>
                </a>
            </div>
        </div>
    )
}
const TeamCard = React.memo(WrappedComponent);
export default TeamCard;