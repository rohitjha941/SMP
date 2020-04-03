import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button';
import styles from './BlogSection.module.scss';
import Slider from './Slider';
import {calculateReadingTime} from '../../utils';

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
        const blogData = this.props.blogs.map(value => {
            return {
                blog_id: value.id,
                imgSrc: value.thumbnail,
                imgAlt: value.title,
                heading: value.title,
                text: value.content,
                metadata: {
                    d1: value.author,
                    d2: value.created_at,
                    d3: calculateReadingTime(value.content),
                }
            }
        })
        return (  
            <React.Fragment>
                <div className={styles.cardSection}>
                    <div className={styles.sectionHeading} >Featured Blogs</div>
                    <Slider blogData={blogData} />
                    <Link to='/blogs'><Button text='View all Blogs' className={styles.viewBlogsButton} type={'outline'}/></Link>
                </div>  
            </React.Fragment>
        );
    }
}
 
export default BlogSection;