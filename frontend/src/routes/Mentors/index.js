import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from '../../components/Loader';

const MentorIndex = Loadable({
    loader: () => import('./MentorIndex'),
    loading: () => <Loader />
})

const ComingSoon = Loadable({
    loader: () => import('../../components/ComingSoon'),
    loading: () => <Loader />
})

const ShowMentors = Loadable({
    loader: () => import('./ShowMentors'),
    loading: () => <Loader />
})

const FilterMentors = Loadable({
    loader: () => import('./FilterMentors'),
    loading: () => <Loader />
})

const PageNotFound = Loadable({
    loader: () => import('../../components/404/Index'),
    loading: () => <Loader />
})
class Mentors extends Component {
    constructor(){
        super();
        this.state={
            filterData : {
                branches:[],
                interests:[],
                year:[]
            }
        }
    }

    updateFilter = (value) =>{
        const newBranches = value.branch;
        const newYear = value.year;
        const newInterests = value.skill;
        const filterData = {
            branches:newBranches,
            interests:newInterests,
            year:newYear,
        }
        this.setState({filterData:filterData})
    }
    render() { 
        return ( 
            <React.Fragment>
                <Switch>
                    <Route exact path="/mentors" render={() => <MentorIndex docs={this.props.docs}/>} />
                    <Route exact path="/mentors/show" render={() => <ShowMentors branches={this.props.branches} interests={this.props.interests} mentors={this.props.mentors} filter={this.state.filterData}/>} /> {/*show all mentors or searched*/}
                    <Route exact path="/mentors/filter" render={(props) => <FilterMentors {...props} branches={this.props.branches} interests={this.props.interests} updateFilter={this.updateFilter}/>} /> {/* filter search */}
                    <Route exact path="/mentors/becomeMentor" render={() => <ComingSoon />} /> {/* procedure to become mentor*/}
                    <Route to="*" component={PageNotFound}/> 
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default Mentors;