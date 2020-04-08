import React, { Component } from 'react';
import styles from './StudentTeamForm.module.scss';
import Button from '../../components/Button';
import Select from 'react-select';
import axios from 'axios';

const yearOptions = [
    {
        value:'1st',
        label:'1st Year',
    },
    {
        value:'2nd',
        label:'2nd Year',
    },
    {
        value:'3rd',
        label:'3rd Year',
    },
    {
        value:'4th',
        label:'4th Year',
    },
    {
        value:'5th',
        label:'5th Year',
    }
];
const positionChoices = [
    {
        value: 'Manager', 
        label: "Manager"
    },
    {
        value:'Coordinator',
        label:'Coordinator'
    }
]

const verticalChoices = [
    {
        value:'Admin',
        label:'Admin'
    },
    {
        value:'Operations',
        label:'Operations'
    },
    {
        value:'WebD',
        label:'WebD'
    },
    {
        value:'Eventts',
        label:'Events'
    },
    {
        value:'Content',
        label:'Content'
    },
    {
        value:'Design',
        label:'Design'
    },
]
class StudentTeamForm extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            enrollno:'',
            image:null,
            year: '',
            branch:'',
            position:'',
            email:'',
            mobile:'',
            vertical:'',
            facebook:'',
            linkden:'',
            branchOptions:[],
            positionOptions:[],
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value,
        });
    }
    handleChangeBranch = (option) => {
        const value = option.value;
        this.setState({
            branch : value,
        });
    }
    handleChangeYear = (option) => {
        const value = option.value;
        this.setState({
            year : value,
        });
    }
    handleChangeVertical = (option) => {
        const value = option.value;
        this.setState({
            vertical : value,
        });
    }
    handleChangePosition = (option) => {
        const value = option.value;
        this.setState({
            position : value,
        })
    }
    handleImage = (e) => {
        const image = e.target.files[0];
        this.setState({
            image:image,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {name,enrollno,image,year,branch,position,vertical,email,mobile,facebook,linkden} = this.state;
        let formData = new FormData();
        formData.append('name' ,name);
        formData.append('year' ,year);
        formData.append('branch' ,branch);
        formData.append('image' ,image, (enrollno+'.jpg'));
        formData.append('enrollno' ,enrollno);
        formData.append('position' ,position);
        formData.append('vertical' ,vertical);
        formData.append('email' ,email);
        formData.append('mobile' ,mobile);
        formData.append('facebook' ,facebook);
        formData.append('linkden' ,linkden);
        axios.post((process.env.REACT_APP_API_BASE+'team/'),formData)
        .then((response)=>{
            this.setState({
                name:'',
                enrollno:'',
                image:null,
                year:'',
                branch:'',
                position:'',
                vertical:'',
                email:'',
                mobile:'',
                facebook:'',
                linkden:'',
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        var branchOptions =[];
        branchOptions = (this.props.branches && this.props.branches.length>0) ? this.props.branches.map(branch=>{
            const option = {
                label : branch.branch_name,
                value : branch.id
            }
            return option;
        }) : [];
        var positionOptions = [];
        positionOptions = (this.props.positions && this.props.positions.length>0) ? this.props.positions.map(position=> {
            const option = {
                label : position.position_name,
                value : position.id
            }
            return option;
        }) : [];
        this.setState({
            branchOptions:branchOptions,
            positionOptions:positionOptions
        })
    }
    render() { 
        return (  
            <>
            <div className={styles.MainWrapper}>
                <h2 className={styles.heading}>Student Team <span className='color-red'>Data</span></h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name<span className='color-red'>*</span></label>
                        <input type="text" className="form-control" name="name" value={this.state.name} id="name" autoCapitalize="on" autoCorrect="off" autoComplete="off" spellCheck="off" placeholder="Enter your Name"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="enrollno">Enrollment Number<span className='color-red'>*</span></label>
                        <input type="number" className="form-control" name="enrollno" value={this.state.enrollno} id="enrollno" placeholder="Enter your Enrollment Number"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year<span className='color-red'>*</span></label>
                        <Select options={yearOptions} onChange={this.handleChangeYear} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch<span className='color-red'>*</span></label>
                        <Select options={this.state.branchOptions} onChange={this.handleChangeBranch} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position<span className='color-red'>*</span></label>
                        <Select options={positionChoices} id="position" onChange={this.handleChangePosition} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Vertical<span className='color-red'>*</span></label>
                        <Select options={verticalChoices} id="position" onChange={this.handleChangePosition} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address <span className='color-red'>*</span></label>
                        <input type="email" className="form-control" value={this.state.email} id="email" name="email" aria-describedby='email-help' placeholder="Enter your Email Address" onChange={this.handleChange} required/>
                        <small id="email-help" className="form-text text-muted">Only '.iitr.ac.in' emails</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="number" className="form-control" name="mobile" value={this.state.mobile} id="mobile" onChange={this.handleChange} placeholder="Enter Your Mobile Number"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photograph<span className='color-red'>*</span></label>
                        <input type="file" className="form-control-file" name="photo" onChange={this.handleImage} aria-describedby="photo-help" id="photo" accept="image/*" required/>
                        <small id="photo-help" className="form-text text-muted">Photograph should be in 1:1 Aspect Ratio</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook URL</label>
                        <input type="url" className="form-control" value={this.state.facebook} name="facebook" id="facebook" placeholder="Enter your Facebook URL" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkden">LinkedIn URL</label>
                        <input type="url" className="form-control" value={this.state.linkden} name="linkden" id="linkeden" placeholder="Enter your LinkedIn URL" onChange={this.handleChange}/>
                    </div>
                    <Button type="submit" className={"btn btn-primary "+styles.button} text='Submit'/>
                </form>
            </div>
            </>
        );
    }
}
 
export default StudentTeamForm;