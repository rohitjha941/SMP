import React, { Component } from 'react';
import SearchHeader from '../../components/SearchHeader';
import styles from './ShowMentors.module.scss';
import MentorCard from '../../components/MentorCard';
class MentorShow extends Component {
    constructor(props){
        super(props);
        this.state={
            filteryear : this.props.filter.year,
            filterbranches : this.props.filter.branches,
            filterinterests : this.props.filter.interests,
            allbranches: [],
            allinterests: this.props.interests,
            mentors : [],
            filteredmentors:[]
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
        this.setState({mentors : mentors},this.filterMentors(mentors));
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
            this.setState({filteredmentors:mentors},this.updateBranches(mentors));
        }
        else{
            
            let branchFiltered = [];
            (filterbranches.length>0 ? 
                filterbranches.map(filterbranch => {
                    return(branchFiltered = (mentors.filter(({branch}) =>  branch === filterbranch)));
                })
                :
                branchFiltered = mentors
            )
            let yearFiltered =[];
            (filteryear.length > 0 ?
                filteryear.map(filteryear => {
                    return(yearFiltered = (branchFiltered.filter(({year}) =>  year === filteryear)))
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
            this.setState({filteredmentors:interestFiltered},this.updateBranches(interestFiltered));
        }

    }
    render() { 
        let {allbranches} = this.state;
        return ( 
            <>
                <div className={styles.container}>
                    <SearchHeader/>
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
                                                <hr/>
                                            </li>
                                            </>
                                            )
                                        }
                                        return 0;
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
         );
    }
}
 
export default MentorShow;