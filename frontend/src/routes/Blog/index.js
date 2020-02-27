import React, {Component} from 'react';
import styles from './Blog.module.scss';
import { Route, Switch, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';
import BlogFullView from './BlogFullView';
import {calculateReadingTime} from 'utils';

const MobileView = Loadable({
    loader: () => import('./MobileView'),
    loading: () => <Loader />
})
const DesktopView = Loadable({
    loader: () => import('./DesktopView'),
    loading: () => <Loader />
})
export default class Blog extends Component {
    constructor(){
    super();
    this.state ={
        mobileView : window.innerWidth < 1000
    }
    }
    resize  = () => {
        let mobWidth =  window.innerWidth < 1000;
        this.setState({ mobileView : mobWidth})
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    render() {
        // const blogData = this.props.blogs.map(value => {
        //     return {
        //         blog_id: value.id,
        //         imgSrc: value.thumbnail,
        //         imgAlt: value.title,
        //         heading: value.title,
        //         text: value.content,
        //         metadata: {
        //             d1: value.author,
        //             d2: value.created_at,
        //             d3: calculateReadingTime(value.content),
        //         }
        //     }
        // })
        const blogData = 
        [
            { blog_id: '1',imgSrc: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',imgAlt: 'Blog',heading: 'Having coffee with faculties at IIT roorkee',text: '"Coffee with Faculty", a new initiative that aims to connect the first year students of various branches to the faculty of their department. The faculty, who voluntarily came up with such an initiative, shall try to let their students know what the prospects of the branch they are students of are, over a cup of coffee! Through ......',metadata: {d1: 'Apan Jain',d2:'2 Aug',d3: '2 min read',}},
            { blog_id: '2',imgSrc: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',imgAlt: 'Blog',heading: 'Having coffee with faculties at IIT roorkee',text: '"Coffee with Faculty", a new initiative that aims to connect the first year students of various branches to the faculty of their department. The faculty, who voluntarily came up with such an initiative, shall try to let their students know what the prospects of the branch they are students of are, over a cup of coffee! Through ......',metadata: {d1: 'Apan Jain',d2:'2 Aug',d3: '2 min read',}},
            { blog_id: '3',imgSrc: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',imgAlt: 'Blog',heading: 'Having coffee with faculties at IIT roorkee',text: '"Coffee with Faculty", a new initiative that aims to connect the first year students of various branches to the faculty of their department. The faculty, who voluntarily came up with such an initiative, shall try to let their students know what the prospects of the branch they are students of are, over a cup of coffee! Through ......',metadata: {d1: 'Apan Jain',d2:'2 Aug',d3: '2 min read',}},
            { blog_id: '4',imgSrc: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',imgAlt: 'Blog',heading: 'Having coffee with faculties at IIT roorkee',text: '"Coffee with Faculty", a new initiative that aims to connect the first year students of various branches to the faculty of their department. The faculty, who voluntarily came up with such an initiative, shall try to let their students know what the prospects of the branch they are students of are, over a cup of coffee! Through ......',metadata: {d1: 'Apan Jain',d2:'2 Aug',d3: '2 min read',}},
            { blog_id: '5',imgSrc: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',imgAlt: 'Blog',heading: 'Having coffee with faculties at IIT roorkee',text: '"Coffee with Faculty", a new initiative that aims to connect the first year students of various branches to the faculty of their department. The faculty, who voluntarily came up with such an initiative, shall try to let their students know what the prospects of the branch they are students of are, over a cup of coffee! Through ......',metadata: {d1: 'Apan Jain',d2:'2 Aug',d3: '2 min read',}},
            { blog_id: '6',imgSrc: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',imgAlt: 'Blog',heading: 'Having coffee with faculties at IIT roorkee',text: '"Coffee with Faculty", a new initiative that aims to connect the first year students of various branches to the faculty of their department. The faculty, who voluntarily came up with such an initiative, shall try to let their students know what the prospects of the branch they are students of are, over a cup of coffee! Through ......',metadata: {d1: 'Apan Jain',d2:'2 Aug',d3: '2 min read',}},
        ];
        return (
            <React.Fragment>
                <div className={styles.mainDiv}>
                
                {this.state.mobileView ? 
                    <Switch>
                        <Route exact path = "/blogs" render={props => (<MobileView {...props} blogData={blogData}/>)} />
                        <Route path = "/blogs/view" render={props => (<BlogFullView {...props} blogData={blogData}/>)} />
                        <Redirect to="/" />
                    </Switch>
                :
                <Switch>
                    <Route exact path = "/blogs" render={props => (<DesktopView {...props} blogData={blogData}/>)} />
                    <Route path = "/blogs/view" render={props => (<BlogFullView {...props} blogData={blogData}/>)} />
                    <Redirect to="/" />
                </Switch>
                }
            </div>
            </React.Fragment>
        )
    }
}