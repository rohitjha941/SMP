import React, { Component } from 'react';
import styles from './FilterMentors.module.scss';
import Button from '../../components/Button';
import FilterHeader from '../../components/FilterHeader';

class FilterMentors extends Component {
    constructor(props){
        super(props);
        this.state={
            allinterests:[],
            allbranches:[],
            allyears:[],
            selectedBranch:[],
            selectedYear:[],
            selectedSkill:[],
        }
    }

    componentDidMount(){
        this.setState({
            allinterests:this.props.filterData.allinterests,
            allbranches:this.props.filterData.allbranches,
            allyears:this.props.filterData.allyears,
            selectedBranch:this.props.filterData.selectedBranch,
            selectedYear:this.props.filterData.selectedYear,
            selectedSkill:this.props.filterData.selectedSkill,
        });
    }

    handleYear = (value) => {
        let {selectedYear,allyears} = this.state;
        let flag = false
        selectedYear.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                allyears.forEach((year,i) => {
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
            allyears.forEach((year,i) => {
                if(year.name === value){
                    year.selected = true;
                }
            })
        }
        this.setState({
            selectedYear : selectedYear,
            allyears : allyears
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
        const allyears = this.state.allyears.concat((value) => {
            value.selected = false
            return(value)
        })
        const allbranches = this.state.allbranches.map((value) => {
            value.selected = false
            return(value)
        })
        const allinterests = this.state.allinterests.map((value) => {
            value.selected = false
            return(value)
        })
        this.setState({
            selectedBranch : [],
            selectedYear: [],
            selectedSkill: [],
            allbranches:allbranches,
            allinterests:allinterests,
            allyears:allyears
        });
        var filterData = {
            branch : [],
            year:[],
            skill:[]
        }
        this.props.updateFilter(filterData)
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
        this.props.handleToggle();
        
        
    }
    render() { 
        return ( 
            <>
                <div className={styles.container}>
                <FilterHeader handleToggle={this.props.handleToggle}/>
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
                        { this.state.allyears.map((value,i) => {
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