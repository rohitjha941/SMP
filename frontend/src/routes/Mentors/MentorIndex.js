import React, { Component } from 'react';
import styles from './MentorIndex.module.scss';
import Button from '../../components/Button';
import {Link} from 'react-router-dom';
import ImageText from 'components/ImageText';


class MentorIndex extends Component {
    state = {  }
    render() { 
        const docs = this.props.docs.map(value => {
            return{
                name:value.name,
                doc:value.document,
            }
        })
        return ( 
            <React.Fragment>
                <div className={styles.mainDiv}>
                    <div className={styles.mainHeading}>Know Your <span className='color-red'>Mentors</span></div>
                    <div className={styles.briefMentors}>
                        SMP allows you to meet the mentors that will help you grow, and you can find mentors at SMP here and approach them. You can filter the mentors according to the field you are interested in or your branch.
                    </div>
                    <Link to='/mentors/show' ><Button className={styles.viewMentorsButton} text="View Mentors '19" type='outline' /></Link>
            
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
                        {
                            docs ? 
                                docs.map((value) =>{
                                    return( 
                                    <>
                                        <a className={styles.links} href={value.doc} target='_new'>{value.name}</a>
                                        <br/>
                                    </>
                                    )
                                })
                                :
                                null
                        }
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default MentorIndex;