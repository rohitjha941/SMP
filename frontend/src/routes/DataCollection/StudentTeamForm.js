import React, { Component } from 'react';
import styles from './StudentTeamForm.module.scss';
import Button from '../../components/Button';
class StudentTeamForm extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            year:undefined,
            branch:undefined,
            position:undefined,
            email:undefined,
            mobile:undefined,
            coordinator:false,
            facebook:undefined,
            linkden:undefined,
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value
        });
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {name,year,branch,position,email,mobile,coordinator,facebook,linkden} = this.state;
        const data = {
            name:name,
            year:year,
            branch:branch,
            position:position,
            email:email,
            mobile:mobile,
            coordinator:coordinator,
            facebook:facebook,
            linkden:linkden
        }
        console.log(data);
    }
    render() { 
        return (  
            <>
            <div className={styles.MainWrapper}>
                <h2 className={styles.heading}>Student Team <span className='color-red'>Data</span></h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name<span className='color-red'>*</span></label>
                        <input type="text" className="form-control" name="name" value={this.state.name} id="name" placeholder="Enter your Name"  onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year<span className='color-red'>*</span></label>
                        <select className="form-control" name="year" value={this.state.year} id="year" onChange={this.handleChange}>
                            <option>Default select</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch<span className='color-red'>*</span></label>
                        <select className="form-control" name="branch" value={this.state.branch} id="branch" onChange={this.handleChange}>
                            <option>Default select</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position<span className='color-red'>*</span></label>
                        <select className="form-control" name="position" value={this.state.position} id="position" onChange={this.handleChange}>
                            <option>Default select</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address <span className='color-red'>*</span></label>
                        <input type="email" className="form-control" value={this.state.email} id="email" placeholder="Enter your Email Address" onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label>Are You A Branch Coordinator ?<span className='color-red'>*</span></label>
                        <div className="form-check" onChange={this.handleChange}>
                            <input className="form-check-input" type="radio" name="coordinator" id="is_coordinator_yes" value={true}/>
                            <label className="form-check-label" htmlFor="is_coordinator_yes">Yes</label>
                            <br/>
                            <input className="form-check-input" type="radio" name="coordinator" id="is_coordinator_no" value={false}/>
                            <label className="form-check-label" htmlFor="is_coordinator_no">No</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="number" className="form-control" name="mobile" value={this.state.mobile} id="mobile" placeholder="Enter Your Mobile Number"/>
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
 
export default StudentTeamForm;