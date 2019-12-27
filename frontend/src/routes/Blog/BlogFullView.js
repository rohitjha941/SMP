import React, { Component } from 'react';
import styles from './BlogFullView.module.scss';
class BlogFullView extends Component {
    blogData = {
        blog_id : 'blog_id',
        imgSrc : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        imgAlt : 'students',
        heading : 'Having coffee with faculties at IIT Roorkee', 
        text : '"Who is a mentor? I\'ll tell you: it isn\'t someone who teaches something, but someone who inspires his/her mentees to give their best in order to discover what they already know.” is the best epigram that describes my journey from being mentee to mentor. We as students should grab each and every learning opportunity given to us since It\'s aptly said, "we are always one decision away from a successful life". My journey in the campus initiated by the Mechanical Department. Passion for automobiles had dragged me to my branch and after being selected in IITR, I was much more excited for a lifetime experience of 4 years. From the first day itself, I made lots of friends who gave me the considerable strength to survive in tough times in my whole tenure till date. After exploring the campus and seeing all the places, everything seemed nice. Then I heard there are many groups on campus which strengthen student\'s learning and personality in any field be it be Technical, Cultural or Managerial aspects. But Now I was perplexed that life is not only about Learning about automobiles here, but much more than that and this was also the moment where I realized that there should be someone to guide me and Students\' Mentorship Programme provides the best opportunity to do so. My mentor was Dhruv Pachauri, already got a pre-placement offer after the third-year Internship and after hearing this, we were all excited to meet him. There was an Ice-breaking session conducted with him in which he gave a basic outline of all the probable options we can pursue according to our interests. Then, I tried in some campus groups like ShARE IITR and EDC IITR.', 
        metadata : {d1:'Apan Jain' , d2:'21 Dec\'19', d3:'5 min read'}
    }
    render() { 
        return ( 
            <React.Fragment>
                <div className={styles.mainDiv}>
                    <div className={styles.mainImageDiv}>
                        <img className={styles.mainImage} src={this.blogData.imgSrc} alt={this.blogData.imgAlt || this.blogData.Title}/>
                    </div>
                    <div className={styles.contentDiv}>
                        <div className={styles.blogHeading}>
                            {this.blogData.heading}
                        </div>
                        <div className={styles.metadata}>
                            {this.blogData.metadata ? (this.blogData.metadata.d1+' • '+this.blogData.metadata.d2+' • '+this.blogData.metadata.d3) : null}
                        </div>
                        <div className={styles.blogText}>
                            {this.blogData.text}
                        </div>
                        <div className={styles.thanks}>
                            Thanks a lot for your time.
                        </div>
                        <hr className={styles.hr}/>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default BlogFullView;