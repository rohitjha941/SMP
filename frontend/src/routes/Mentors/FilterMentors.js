import React, { Component } from 'react';
import styles from './FilterMentors.module.scss';
import Button from '../../components/Button';
import FilterHeader from '../../components/FilterHeader';

let branch = [
    { name : 'Architecture and Planning', value : 'Architecture and Planning', selected : false},
    { name : 'Electrical', value : 'Electrical Engineering', selected : false},
    { name : 'Biotechnology', value :'Biotechnology', selected : false },
    { name : 'Civil', value : 'Civil Engineering', selected : false},
    { name : 'ECE' , value: 'Electronics and Communication Engineering', selected : false},
    { name : 'Chemical', value : 'Chemical Engineering', selected : false},
    { name : 'Metallurgy and Materials' , value : 'Metallurgy and Materials Engineering', selected : false},
    { name : 'Geological Technology(GT)' , value : 'Geological Technology(GT)', selected : false},
    { name : 'Mechanical' , value : ' Mechanical Engineering', selected : false},
]

let skills = [
    {value : 'Software Development', selected : false},
    {value : 'Design', selected : false},
    {value : 'Product Management', selected : false},
    {value : 'ML/AI', selected : false},
    {value : 'Finance', selected : false},
    {value : 'Research', selected : false},
    {value : 'Data Science', selected : false},
    {value : 'Development', selected : false},
]

let year = [
    {value : '3rd', selected : false},
    {value : '4th', selected : false},
    {value : '5th', selected : false},
]

class FilterMentors extends Component {
    constructor(){
        super();
        this.state={
            selectedBranch:[],
            selectedYear:[],
            selectedSkill:[]
        }
    }

    handleYear = (value) => {
        let {selectedYear} = this.state;
        let flag = false
        selectedYear.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                year.forEach((year,i) => {
                    if(year.value === value){
                        year.selected = false;
                        return(selectedYear.splice(index,1));
                    }
                    // return(selectedYear);
                })
            }
        })
        if(!flag){
            selectedYear.push(value)
            year.forEach((year,i) => {
                if(year.value === value){
                    year.selected = true;
                }
            })
        }
        this.setState({
            selectedYear : selectedYear
        })
    }

    handleBranch = (value) => {
        let {selectedBranch} = this.state;
        let flag = false
        selectedBranch.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                branch.forEach((branch,i) => {
                    if(branch.value === value){
                        branch.selected = false;
                        return(selectedBranch.splice(index,1));
                    }
                })
            }
        })
        if(!flag){
            selectedBranch.push(value)
            branch.forEach((branch,i) => {
                if(branch.value === value){
                    branch.selected = true;
                }
            })
        }
        this.setState({
            selectedBranch : selectedBranch
        })
    }

    handleSkill = (value) => {
        let {selectedSkill} = this.state;
        let flag = false
        selectedSkill.forEach((selected,index) => {
            if(selected===value){
                flag = true;
                skills.forEach((skill,i) => {
                    if(skill.value === value){
                        skill.selected = false;
                        return(selectedSkill.splice(index,1));
                    }
                })
            }
        })
        if(!flag){
            selectedSkill.push(value)
            skills.forEach((skill,i) => {
                if(skill.value === value){
                    skill.selected = true;
                }
            })
        }
        this.setState({
            selectedSkill : selectedSkill
        })
    }

    onClear = () => {
        this.setState({
            selectedBranch : [],
            selectedYear: [],
            selectedSkill: []
        });
        year.map((year) => {
            return(year.selected = false)
        })
        branch.map((branch) => {
            return(branch.selected = false)
        })
        skills.map((skill) => {
            return(skill.selected = false)
        })
    }

    onApply = (e) => {
        e.preventDefault();
        console.log(this.state.selectedBranch);
        console.log(this.state.selectedYear);
        console.log(this.state.selectedSkill);
        console.log('*****')
    }
    render() { 
        return ( 
            <>
                <div className={styles.container}>
                <FilterHeader/>
                    <div className={styles.section}>
                        <div className={styles.sectionHeading}>Select Branch<span className={styles.counter}>{this.state.selectedBranch.length ? (' ('+this.state.selectedBranch.length+')') : null }</span></div>
                        { branch.map((branch,i)=>{
                            return(
                                <Button key={i} onClick={() => this.handleBranch(branch.value)} text={branch.name} type={branch.selected ? 'outline' : 'disabled'} className={styles.button}/>
                            )
                        })}
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionHeading}>Year of Study<span className={styles.counter}>{this.state.selectedYear.length ? (' ('+this.state.selectedYear.length+')') : null }</span></div>
                        { year.map((year,i) => {
                            return(
                                <Button key={i} className={styles.button} text={year.value + ' Year'} value={year.value} type={year.selected ? 'outline' : 'disabled'} onClick={() => this.handleYear(year.value)}/>
                            )
                        })}
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionHeading}>Areas of Interest<span className={styles.counter}>{this.state.selectedSkill.length ? (' ('+this.state.selectedSkill.length+')') : null }</span></div>
                        {skills.map((skill,i) => {
                            return(
                                <Button key={i} className={styles.button} text={skill.value} type={skill.selected ? 'outline' : 'disabled'} onClick={() => this.handleSkill(skill.value)} />
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