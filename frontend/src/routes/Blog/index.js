import React, {Component} from 'react';
import styles from './Blog.module.scss';
import { Route, Switch, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';
import BlogFullView from './BlogFullView';

const MobileView = Loadable({
    loader: () => import('./MobileView'),
    loading: () => <Loader />
})
const DesktopView = Loadable({
    loader: () => import('./DesktopView'),
    loading: () => <Loader />
})
export default class Blog extends Component {
    constructor() {
        super();
        this.state = {
          blogData : {},
          mobileView : window.innerWidth < 1000 
        }
      }

    componentDidMount () {
        this.setState({
            blogData : {
                blog_id : 'blog_id',
                imgSrc : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
                imgAlt : 'students',
                heading : 'Having coffee with faculties at IIT Roorkee', 
                text : 'Every fresher joining the institute is assigned a mentor (a student of 3/4th year) who they can approach with queries on any issue like academics, extracurricular', 
                metadata : {d1:'Apan Jain' , d2:'21 Dec\'19', d3:'5 min read'}
            }
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className={styles.mainDiv}>
                
                {this.state.mobileView ? 
                    <Switch>
                        <Route exact path = "/blogs" render={props => (<MobileView {...props} blogData={this.state.blogData}/>)} />
                        <Route path = "/blogs/view" render={props => (<BlogFullView {...props} blogData={this.state.blogData}/>)} />
                        <Redirect to="/" />
                    </Switch>
                :
                <Switch>
                    <Route exact path = "/blogs" render={props => (<DesktopView {...props} blogData={this.state.blogData}/>)} />
                    <Route path = "/blogs/view" render={props => (<BlogFullView {...props} blogData={this.state.blogData}/>)} />
                    <Redirect to="/" />
                </Switch>
                }
            </div>
            </React.Fragment>
        )
    }
}