import React, { Component } from 'react';
import SearchHeader from '../../components/SearchHeader';
import styles from './ShowMentors.module.scss';
import MentorCard from '../../components/MentorCard';
import FilterMentors from './FilterMentors';
class MentorShow extends Component {
    constructor(props){
        super(props);
        this.state={
            filteryear : [],
            filterbranches : [],
            filterinterests : [],
            allbranches: [],
            allinterests: this.props.interests ? this.props.interests : [],
            mentors : [],
            filteredmentors:[],
            filterToggle:false,
            filterComponentData:{},
        }
    }
    componentDidMount(){
        let mentors = this.props.mentors.map(value => {
            let interests = [];
            value.interest.forEach(interestID =>{
                this.props.interests.forEach(interest =>{
                    if(interest.id === interestID){
                        return(
                            interests.push(interest.interest_name)
                        )
                    }
                })
            })
            let branch_name = this.props.branches.find((element) => {
                return(element.id === value.branch)
            });
            return({    
                image : value.photo,
                name : value.name,
                branch: value.branch,
                branch_name : branch_name.branch_name,
                year : value.year,
                skills : interests,
                interests : value.interest
            })
        })
        const allinterests = this.props.interests ? 
        (this.props.interests.map(value =>{
                return({
                    id: value.id,
                    name : value.interest_name,
                    selected: false
                })
        }))
        :[];
        const allbranches = this.props.branches ? (this.props.branches.map(value =>{
            return({
                id: value.id,
                name: value.branch_name,
                selected: false
            })
        })) : [];
        const allyears = [
            {name : '3rd', selected : false},
            {name : '4th', selected : false},
            {name : '5th', selected : false},
        ]
        let filterComponentData = {
            allbranches : allbranches,
            allyears : allyears,
            allinterests: allinterests,
            selectedSkill:[],
            selectedBranch:[],
            selectedYear:[]  
        }
        this.setState({mentors : mentors,filterComponentData:filterComponentData},()=>{this.filterMentors(this.state.mentors)});
    }
    updateFilter = (value) =>{
        const newBranches = value.branch;
        const newYear = value.year;
        const newInterests = value.skill;
        const allbranches = value.allbranches;
        const allinterests = value.allinterests;
        const allyears = value.allyears;
        const filterComponentData = {
            selectedBranch  : newBranches,
            selectedYear : newYear,
            selectedSkill : newInterests,
            allyears : allyears,
            allinterests : allinterests,
            allbranches : allbranches,
        }
        this.setState({
            filteryear:newYear,
            filterbranches:newBranches,
            filterinterests:newInterests,
            filterComponentData:filterComponentData
        },() => {this.filterMentors(this.state.mentors)});
    }
    
    updateBranches = (mentors) =>{
        let availablebranches = [];
        mentors.forEach(value => {
            var isAvailable = false;
            availablebranches.forEach(branch =>{
                if(branch === value.branch){
                    isAvailable = true;
                }
            })
            if(!isAvailable){
                availablebranches.push(value.branch);
            }
        })
        let allbranches=[];
        this.props.branches.forEach(value =>{
            availablebranches.forEach(branchID =>{
                if(branchID === value.id){
                    return(
                        allbranches.push(value)
                    )
                }
            })
        })
        this.setState({allbranches:allbranches});
    }
    
    filterMentors = (mentors) => {
        let {filteryear,filterbranches,filterinterests} = this.state;
        if((!filteryear||filteryear.length===0)&&(!filterbranches||filterbranches.length===0)&&(!filterinterests||filterinterests.length===0)){
            this.setState({filteredmentors:mentors},()=>{this.updateBranches(mentors)});
        }
        else{
            
            let branchFiltered = [];
            (filterbranches.length>0 ? 
                filterbranches.map(filterbranch => {
                    return(branchFiltered.push(...(mentors.filter(({branch}) =>  branch === filterbranch))));
                })
                :
                branchFiltered = mentors
            )
            let yearFiltered =[];
            (filteryear.length > 0 ?
                filteryear.map(filteryear => {
                    return(yearFiltered.push(...(branchFiltered.filter(({year}) =>  year === filteryear))));
                })
                :
                yearFiltered = branchFiltered
            )
            let interestFiltered = [];

            //to compare interest
            let filterinterestsNum=[];
            //..

            filterinterests.forEach((value) => {
                return(filterinterestsNum[value] = 1);
            });
            (filterinterests.length > 0 ?
                yearFiltered.map(mentor => {
                    for(var i=0;i<mentor.interests.length;i++){
                        if(filterinterestsNum[mentor.interests[i]]){
                            interestFiltered.push(mentor);
                            break;
                        }
                    }
                    return 0;
                })
                :
                interestFiltered = yearFiltered
            )
            this.setState({filteredmentors:interestFiltered},()=>{this.updateBranches(interestFiltered)});
        }

    }
    handleToggle = () => {
        var filterToggle = !this.state.filterToggle;
        this.setState({filterToggle:filterToggle});
    }
    render() { 
        let {allbranches} = this.state;
        return (
            <> 
            {this.state.filterToggle ? 
                <FilterMentors filterData={this.state.filterComponentData} updateFilter={this.updateFilter} handleToggle={this.handleToggle}/>
                :
                <>
                    <div className={styles.container}>
                        <SearchHeader handleToggle={this.handleToggle}/>
                        {
                            allbranches.map(value =>{
                                return(
                                    <>
                                <div className={styles.department}>{value.branch_name}</div>
                                <ul className="mentors">
                                    {
                                        this.state.filteredmentors.map((mentor,i) => {
                                            if(mentor.branch === value.id){
                                                return(
                                                <>
                                                <li className='mentor-li'>
                                                    <MentorCard 
                                                        className={styles.mentorCard}
                                                        profile={mentor}
                                                        key={i}
                                                    />
                                                    {/* {i>0? <hr/> : null} */}
                                                </li>
                                                </>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </ul>
                                <hr/>
                                </>
                                )
                            })
                        }
                    </div>
                </>
            }
            </>
         );
    }
}
 
export default MentorShow;