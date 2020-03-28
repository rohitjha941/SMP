import React, { Component } from 'react';
import styles from './FilterMentors.module.scss';
import Button from '../../components/Button';
import FilterHeader from '../../components/FilterHeader';

class FilterMentors extends Component {
    constructor(){
        super();
        this.state={
            allinterests:[],
            allbranches:[],
            allyear:[],
            selectedBranch:[],
            selectedYear:[],
            selectedSkill:[],
        }
    }

    componentDidMount(){
        const allinterests = this.props.interests ? 
        (this.props.interests.map(value =>{
                return({
                    id: value.id,
                    name : value.interest_name,
                    selected: false
                })
        }))
        :null;
        const allbranches = this.props.branches ? (this.props.branches.map(value =>{
            return({
                id: value.id,
                name: value.branch_name,
                selected: false
            })
        })) : null;
        const allyear = [
            {name : '3rd', selected : false},
            {name : '4th', selected : false},
            {name : '5th', selected : false},
        ]
        this.setState({
            allinterests:allinterests,
            allbranches:allbranches,
            allyear:allyear
        });
    }

    handleYear = (value) => {
        let {selectedYear,allyear} = this.state;
        let flag = false
        selectedYear.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                allyear.forEach((year,i) => {
                    if(year.name === value){
                        year.selected = false;
                        return(selectedYear.splice(index,1));
                    }
                    // return(selectedYear);
                })
            }
        })
        if(!flag){
            selectedYear.push(value)
            allyear.forEach((year,i) => {
                if(year.name === value){
                    year.selected = true;
                }
            })
        }
        this.setState({
            selectedYear : selectedYear,
            allyear : allyear
        })
    }

    handleBranch = (value) => {
        let {selectedBranch,allbranches} = this.state;
        let flag = false
        selectedBranch.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                allbranches.forEach((branch,i) => {
                    if(branch.id === value){
                        branch.selected = false;
                        return(selectedBranch.splice(index,1));
                    }
                })
            }
        })
        if(!flag){
            selectedBranch.push(value)
            allbranches.forEach((branch,i) => {
                if(branch.id === value){
                    branch.selected = true;
                }
            })
        }
        this.setState({
            selectedBranch : selectedBranch
        })
    }

    handleSkill = (value) => {
        let {selectedSkill,allinterests} = this.state;
        let flag = false
        selectedSkill.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                allinterests.forEach((skill,i) => {
                    if(skill.id === value){
                        skill.selected = false;
                        return(selectedSkill.splice(index,1));
                    }
                })
            }
        })
        if(!flag){
            selectedSkill.push(value)
            allinterests.forEach((skill,i) => {
                if(skill.id === value){
                    skill.selected = true;
                }
            })
        }
        this.setState({
            selectedSkill : selectedSkill,
            allinterests : allinterests 
        })
    }

    onClear = () => {
        const year = this.state.year.map((value) => {
            return(value.selected = false)
        })
        const allbranches = this.state.allbranches.map((value) => {
            return(value.selected = false)
        })
        const allinterests = this.state.allinterests.map((value) => {
            return(value.selected = false)
        })
        this.setState({
            selectedBranch : [],
            selectedYear: [],
            selectedSkill: [],
            allbranches:allbranches,
            allinterests:allinterests,
            year:year
        });
    }

    onApply = (e) => {
        e.preventDefault();
        const branch = this.state.selectedBranch;
        const year = this.state.selectedYear;
        const skill = this.state.selectedSkill;
        var filterData = {
            branch : branch,
            year : year,
            skill : skill
        }

        this.props.updateFilter(filterData);
        this.props.history.push('/mentors/show');
        
        
    }
    render() { 
        return ( 
            <>
                <div className={styles.container}>
                <FilterHeader/>
                    <div className={styles.section}>
                        <div className={styles.sectionHeading}>Select Branch<span className={styles.counter}>{this.state.selectedBranch.length ? (' ('+this.state.selectedBranch.length+')') : null }</span></div>
                        { this.state.allbranches.map((value,i)=>{
                            return(
                                <Button key={i} onClick={() => this.handleBranch(value.id)} text={value.name} type={value.selected ? 'outline' : 'disabled'} className={styles.button}/>
                            )
                        })}
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionHeading}>Year of Study<span className={styles.counter}>{this.state.selectedYear.length ? (' ('+this.state.selectedYear.length+')') : null }</span></div>
                        { this.state.allyear.map((value,i) => {
                            return(
                                <Button key={i} className={styles.button} text={value.name + ' Year'} type={value.selected ? 'outline' : 'disabled'} onClick={() => this.handleYear(value.name)}/>
                            )
                        })}
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionHeading}>Areas of Interest<span className={styles.counter}>{this.state.selectedSkill.length ? (' ('+this.state.selectedSkill.length+')') : null }</span></div>
                        {this.state.allinterests.map((value,i) => {
                            return(
                                <Button key={i} className={styles.button} text={value.name} type={value.selected ? 'outline' : 'disabled'} onClick={() => this.handleSkill(value.id)} />
                            )
                        })}
                    </div>
                    <hr/>
                    <ul className={styles.apply}>
                        <li className={styles.applyButton}><Button  text='Apply Filters' onClick={this.onApply} /></li>
                        <li className={styles.clearButton}><Button  text='Clear All' type='outline' onClick={this.onClear} /></li>
                    </ul>
                </div>
            </>
        );
    }
}
 
export default FilterMentors;