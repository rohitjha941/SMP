import React, { Component } from 'react';
import BlogCard from '../../components/BlogCard';
import Button from '../../components/Button';
import styles from './MobileView.module.scss';

export default class MobileView extends Component {
    render() { 
        return (
            <React.Fragment>
                <div className={styles.heading}><span className='color-red'>Read</span> what we do</div>
                <div>
                    <div className={styles.categoryHeading}>Featured</div>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.props.blogData}
                        type={window.innerWidth <600 ? 'sm' : 'lg'}
                        // headingTop = {false}
                    />
                    <hr className={styles.hr}/>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.props.blogData}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // heading = {false} 
                    />
                    <hr className={styles.hr}/>
                </div>
                <div>
                    <div className={styles.categoryHeading}>Journey from Mentee to Mentor</div>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.props.blogData}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // metadata = {false}
                    />
                    <hr className={styles.hr}/>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.props.blogData}
                        type={window.innerWidth < 600 ? 'sm' : 'lg'}
                        // text = {false}
                    />
                    <hr className={styles.hr}/>
                </div>
                <Button type='outline' text='View More'/>
            </React.Fragment>
        );
    }
}
