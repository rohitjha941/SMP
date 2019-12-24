import React, {Component} from 'react';
import styles from './Blog.module.scss';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
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
                {window.innerWidth < 1000 ? 
                    <MobileView blogData={this.blogData}/>
                :
                    <DesktopView />
                }
            </div>
        )
    }
}