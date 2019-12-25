import React, { Component } from 'react';
import BlogCard from '../../components/BlogCard';
import Button from '../../components/Button';
import styles from './BlogSection.module.scss';
import Slider from './Slider';

let blogData1 = {
    blog_id : 'blog_id',
    imgSrc : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
    imgAlt : 'students',
    heading : 'Having coffee with faculties at IIT Roorkee', 
    text : 'Every fresher joining the institute is assigned a mentor (a student of 3/4th year) who they can approach with queries on any issue like academics, extracurricular', 
    metadata : {d1:'Apan Jain' , d2:'21 Dec\'19', d3:'5 min read'}
}
let blogData2 = {
    blog_id : 'blog_id',
    imgSrc : 'https://images.unsplash.com/photo-1577201869197-a6df0ba33623?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imgAlt : 'students',
    heading : 'Having coffee with faculties at IIT Roorkee', 
    text : 'Every fresher joining the institute is assigned a mentor (a student of 3/4th year) who they can approach with queries on any issue like academics, extracurricular', 
    metadata : {d1:'Apan Jain' , d2:'21 Dec\'19', d3:'5 min read'}
}
class BlogSection extends Component {
    constructor(){
        super();
        this.state={
            containerType:'md',
        }
    }
    componentDidMount(){
        let type = window.innerWidth  < 600 ? 'sm' : 'lg';
        this.setState({
            containerType : type
        })
    }
    render() { 
        return (  
            <React.Fragment>
                <div className={styles.cardSection}>
                    <div className={styles.sectionHeading} >Featured Blogs</div>
                    <Slider blogData={[blogData1,blogData2,blogData1,blogData2]} />
                    <Button text='View all Blogs' className={styles.viewBlogsButton} type={'outline'}/>
                </div>  
            </React.Fragment>
        );
    }
}
 
export default BlogSection;