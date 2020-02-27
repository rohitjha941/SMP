import React, { Component } from 'react';
import styles from './DesktopView.module.scss';
import Blogcard from '../../components/BlogCard';
// import ComingSoon from '../../components/ComingSoon';

class DesktopView extends Component {
    state = {  }
    render() { 
        const blogData = this.props.blogData;
        return ( 
            <>
            <div className={styles.container1}>
                <div className={styles.headingContainer}>
                     <span className='color-red'>Read</span> What We Do
                </div>
                <ul className={styles.ul1}>
                    <li>
                        <Blogcard blogData={blogData[0]} type='xl' className={styles.blogcardXl}/>
                    </li>
                    <li>
                        <ul className={styles.ul2}>
                            <li>
                                <Blogcard blogData={blogData[1]} type='lg' className={styles.blogcardlg} text={false}/>
                            </li>
                            <li>
                                <Blogcard blogData={blogData[0]} type='lg' className={styles.blogcardlg} text={false}/>
                            </li>
                        </ul>
                    </li>
                </ul>    
            </div>
            <div className={styles.container2}>  
                <div className={styles.sectionHeading}>Journey from a Mentee to a Mentor</div>
                <ul className={styles.ul3}>
                    {blogData.map((value,i) =>{
                        return(
                            <li><Blogcard key={i} blogData={value} type='md' heading={false}/></li>
                        )
                    })}
                </ul>
            </div>   
            </>
         );
    }
}
 
export default DesktopView;