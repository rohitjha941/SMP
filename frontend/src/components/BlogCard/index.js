import React from 'react';
import Text from './Text';
import styles from './BlogCard.module.scss';

const blogCardContentCharacterLimit = 100;

function WrappedComponent(props) {
    const blog_id = props.blogData.blog_id;
    const imageSource = props.blogData.imgSrc;
    const imageAlternativeText = (props.blogData.imgAlt) ? props.blogData.imgAlt : props.blogData.heading;
    const heading = props.heading === undefined ? props.blogData.heading : props.heading ? props.blogData.heading : null;
    const text = props.text === undefined ? props.blogData.text : props.text ? props.blogData.text : null;
    const truncatedText = text? text.substring(0, blogCardContentCharacterLimit):"";
    const metadata = props.metadata === undefined ? props.blogData.metadata : props.metadata ? props.blogData.metadata : null;
    const headingTop = props.headingTop === false ? false : (window.innerWidth < 1000) ? true : props.headingTop ? true :  false;
    return (
        <React.Fragment>
            <div className={
                (props.type === 'sm' ? styles.containersm : null ||
                 props.type === 'lg' ? styles.containerlg : null ||
                 props.type === 'xl' ? styles.containerxl : null ||
                                       styles.containermd)
                +' '+props.className
            } id={props.id} > 
                { headingTop ? 
                    <h3 className={
                        props.type === 'xl' ? styles.headingxl : null ||
                        props.type === 'lg' ? styles.headinglg : null ||
                        props.type === 'sm' ? styles.headingsm : null ||
                                              styles.headingmd
                    }>
                    {heading ? heading : null}
                </h3>
                :
                null}
                <img className={styles.blogImage} src={imageSource} alt={imageAlternativeText} />
                <Text heading={heading} text={truncatedText} metadata={metadata} blog_id={blog_id} headingTop={headingTop} type={props.type}/>
            </div>
        </React.Fragment>
    )
}

const BlogCard = React.memo(WrappedComponent);
export default BlogCard;