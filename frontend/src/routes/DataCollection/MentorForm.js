import React, { Component } from 'react';
import Button from '../../components/Button';
import styles from './MentorForm.module.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const animatedComponents = makeAnimated();
const yearOptions = [
    {
        label:'3rd Year',
        value:'3rd',
    },
    {
        label:'4th Year',
        value:'4th',
    },
    {
        label:'5th Year',
        value:'5th',
    },
]
class MentorForm extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            year:undefined,
            branch:undefined,
            intertest:[],
            email:'',
            facebook:undefined,
            linkden:undefined,
            branchOptions:[],
            interestOptions:[],
            createdInterest:[],
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value
        },()=>{console.log(this.state.email)});
        
    }
    handleChangeBranch = (option) => {
        const value = option.value;
        this.setState({
            branch:value,
        });
    }
    handleChangeYear = (option) => {
        const value = option.value;
        this.setState({
            year:value,
        });
    }
    handleChangeCreatable = (option) => {
        const value = option.map(interest=>{
            return interest.value;
        })
        this.setState({
            interest : value,
        })
    }
    handleCreate = (inputValue) => {
        const {createOptions} = this.state;
        this.setState({
            createOptions : [...createOptions,inputValue]
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {name,year,branch,interest,email,facebook,linkden} = this.state;
        const data = {
            name:name,
            year:year,
            branch:branch,
            interest:interest,
            email:email,
            facebook:facebook,
            linkden:linkden
        }
        const {createdInterest} = this.state;
        axios.post(process.env.REACT_APP_API_BASE+'interests/',createdInterest)
        .then((response)=>{
            console.log(response);
        })
        
    }
    componentDidMount(){
        let branchOptions=[], interestOptions=[];
        branchOptions =  this.props.branches.length>0 ? this.props.branches.map((branch)=>{
            const option = {
                value : branch.id,
                label : branch.branch_name
            }
            return (option);
        }) : [] ;
        interestOptions = this.props.interests.length>0 ? this.props.interests.map(interest => {
            const option = {
                value : interest.id,
                label : interest.interest_name
            }
            return (option);
        }) : [];
        this.setState({branchOptions:branchOptions,interestOptions:interestOptions});
    }
    render() { 
        return (  
            <>
            <div className={styles.MainWrapper}>
                <h2 className={styles.heading}>Mentors (2020-21) <span className='color-red'>Data</span></h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name<span className='color-red'>*</span></label>
                        <input type="text" className="form-control" name="name" value={this.state.name} id="name" placeholder="Enter your Name"  onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year<span className='color-red'>*</span></label>
                        <Select id="year" onChange={this.handleChangeYear} options={yearOptions}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch<span className='color-red'>*</span></label>
                        <Select id="branch" onChange={this.handleChangeBranch} options={this.state.branchOptions}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="interests">Interests<span className='color-red'>*</span></label>
                        <CreatableSelect 
                            id="interests" 
                            options={this.state.interestOptions} 
                            closeMenuOnSelect={false}
                            isMulti 
                            onChange={this.handleChangeCreatable}
                            components={animatedComponents}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address <span className='color-red'>*</span></label>
                        <input type="email" className="form-control" value={this.state.email} id="email" placeholder="Enter your Email Address" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photograph<span className='color-red'>*</span></label>
                        <input type="file" className="form-control-file" name="photo" aria-describedby="photo-help" id="photo"/>
                        <small id="photo-help" className="form-text text-muted">Photograph should be in 1:1 Aspect Ratio</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook URL</label>
                        <input type="url" className="form-control" value={this.state.facebook} id="facebook" placeholder="Enter your Facebook URL" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkden">LinkedIn URL</label>
                        <input type="url" className="form-control" value={this.state.linkden} id="linkeden" placeholder="Enter your LinkedIn URL" onChange={this.handleChange}/>
                    </div>
                    <Button type="submit" className={"btn btn-primary "+styles.button} text='Submit'/>
                </form>
            </div>
            </>
        );
    }
}
 
export default MentorForm;