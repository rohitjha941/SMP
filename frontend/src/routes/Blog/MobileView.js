import React, { Component } from 'react';
import BlogCard from '../../components/BlogCard';
import Button from '../../components/Button';
import styles from './MobileView.module.scss';

export default class MobileView extends Component {
    render() { 
        const blogData = this.props.blogData? this.props.blogData : null;
        return (
            <React.Fragment>
                <div className={styles.heading}><span className='color-red'>Read</span> what we do</div>
                <>
                <div>
                    <div className={styles.categoryHeading}>Featured</div>
                    {(blogData && blogData.length>0)?
                    <>
                    {blogData.map(value => (
                        <div key={value.blog_id}>
                            <BlogCard 
                                className={styles.blogCardCommon} 
                                blogData={value}
                                type={window.innerWidth <600 ? 'sm' : 'lg'}
                            />
                            <hr className={styles.hr}/>
                        </div>
                    ))}
                    </>
                    :null}
                </div>
                <div>
                    <div className={styles.categoryHeading}>Journey from Mentee to Mentor</div>
                    {(blogData && blogData.length>0)?
                    <>
                    {blogData.map(value => (
                        <div key={value.blog_id}>
                            <BlogCard 
                                className={styles.blogCardCommon} 
                                blogData={value}
                                type={window.innerWidth <600 ? 'sm' : 'lg'}
                            />
                            <hr className={styles.hr}/>
                        </div>
                    ))}
                    </>
                    :null}
                </div>
                <Button className={styles.viewMore} type='outline' text='View More'/>
                </>
            </React.Fragment>
        );
    }
}
