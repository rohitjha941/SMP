import React, { Component } from 'react';
import styles from './MentorIndex.module.scss';
import Button from '../../components/Button';
import {Link} from 'react-router-dom';
import ImageText from 'components/ImageText';


class MentorIndex extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className={styles.mainDiv}>
                    <div className={styles.mainHeading}>Know Your <span className='color-red'>Mentors</span></div>
                    <div className={styles.briefMentors}>
                        SMP allows you to meet the mentors that will help you grow, and you can find mentors at SMP here and approach them. You can filter the mentors according to the field you are interested in or your branch.
                    </div>
                    <Link to='/mentors/show' ><Button className={styles.viewMentorsButton} text="View Mentors '19" type='outline' /></Link>
                    
                    {/* <div className={styles.secondSection}>
                        <div className={styles.imageDiv}>
                            <img className={styles.mentorImage} src={'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'} alt={'mentorMenteeImage'}/>
                        </div>
                        <div className={styles.recruitHeading}>
                            <span className='color-red'>Become </span>a mentor with SMP
                        </div>
                        <div className={styles.recruitText}>
                            Every year SMP recruits mentors from future 3rd/4th/5th year to guide the coming freshers @ IITR. We want our mentor to guide the first yearities and help them adjust to the R-land.
                        </div>
                        <Link to='/mentors/becomeMentor'><Button className={styles.learnMore} type='outline' text='Learn More'/></Link>
                    </div> */}
                    <div className={styles.infoContainer}>
                        < ImageText
                            imgSrc={'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                            heading={'Become a mentor with SMP'}
                            text={'Every year SMP recruits mentors from future 3rd/4th/5th year to guide the coming freshers @ IITR. We want our mentor to guide the first yearities and help them adjust to the R-land.'}
                        />
                    </div >
                    <Link to='/mentors/becomeMentor'><Button className={styles.learnMore} type='outline' text='Learn More'/></Link>

                    <div className={styles.resourceHeading}>Mentor Resources</div>
                    <div className={styles.impLinks}>
                        <a className={styles.links} href='#'>Mentors Guide.PDF</a>
                        <br/>
                        <a className={styles.links} href='#'>How to help mentees.PDF</a>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default MentorIndex;