import React, {Component} from 'react';
import styles from './Blog.module.scss';
import BlogCard from '../../components/BlogCard'
import Button from '../../components/Button'

export default class Blog extends Component {

    blogData = {
        blog_id : 'blog_id',
        imgSrc : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        imgAlt : 'students',
        heading : 'Having coffee with faculties at IIT Roorkee', 
        text : 'Every fresher joining the institute is assigned a mentor (a student of 3/4th year) who they can approach with queries on any issue like academics, extracurricular', 
        metadata : {d1:'Apan Jain' , d2:'21 Dec\'19', d3:'5 min read'}
    }
    render() {
        return (
            <div className={styles.mainDiv}>
                <div className={styles.heading}><span className='color-red'>Read</span> what we do</div>
                <div>
                    <div className={styles.categoryHeading}>Featured Blogs</div>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.blogData}
                    />
                    <hr className={styles.hr}/>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.blogData}
                    />
                    <hr className={styles.hr}/>
                </div>
                <div>
                    <div className={styles.categoryHeading}>Journey from Mentee to Mentor</div>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.blogData}
                    />
                    <hr className={styles.hr}/>
                    <BlogCard 
                        className={styles.blogCardCommon} 
                        blogData={this.blogData}
                    />
                    <hr className={styles.hr}/>
                </div>
                <Button type='outline' text='View More'/>
            </div>
        )
    }
}