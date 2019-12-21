import React, {Component} from 'react';

import styles from './Blog.module.scss';
import BlogCard from '../../components/BlogCard'
import image from 'assets/images/blog1.png'

export default class Blog extends Component {
    render() {
        return (
            <div className={styles.mainDiv}>
                <div className={styles.heading}><span className='color-red'>Read</span> what we do</div>
                <BlogCard className={styles.blogCardCommon} imgSrc={image} imgAlt={'students'} heading={'Having coffee with faculties at IIT roorkee'} text={'Every fresher joining the institute is assigned a mentor (a student of 3/4th year) who they can approach with queries on any issue like academics, extracurricular... Read More'} metadata={{d1:'Apan Jain' , d2:'21 Dec\'19', d3:'5 min read'}}/>
            </div>
        )
    }
}