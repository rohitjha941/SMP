import React, { Component } from 'react';
import Button from '../../components/Button';
import styles from './MentorForm.module.scss';
class MentorForm extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            year:undefined,
            branch:undefined,
            email:'',
            facebook:undefined,
            linkden:undefined,
        }
    }
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value
        },()=>{console.log(this.state.email)});
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {name,year,branch,email,facebook,linkden} = this.state;
        const data = {
            name:name,
            year:year,
            branch:branch,
            email:email,
            facebook:facebook,
            linkden:linkden
        }
        console.log(data);
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