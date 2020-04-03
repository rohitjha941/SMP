import React, { Component } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import styles from './contact.module.scss';
class Contact extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            query:'',
            errmsg:'',
        }
    }
    onChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value })
    }


    handleSubmit = (e) => {
        e.preventDefault(); 
        let data = {
            name: this.state.name,
            email: this.state.email,
            query: this.state.query
        }
        axios.post((process.env.REACT_APP_API_BASE+'raise-query/'),data)
        .then((response) => {
            // console.log(response);
            this.setState({
                errmsg:"<div>Your query has been raised<br/>We'll get back to you soon.</div>"
            });
        })
        .catch((error) => {
            // console.log(error);
            this.setState({
                errmsg:"<div>There was a problem sending your query<br/>Please try again later.</div>"
            });
        })
    }
    render() {
        let email = this.state.email;
        let name = this.state.name;
        let query = this.state.query; 
        return ( 
            <div className={styles.contact}>
                <div className={styles.contactTitle}>Need More Help? <span className='color-red'>Contact Us</span></div>
                <div className={styles.contactForm}>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name</label>
                        <br/>
                        <input 
                            name='name' 
                            placeholder='Joe' 
                            type='text'
                            id='inputName'
                            value={name}
                            onChange={this.onChange}
                            autoCapitalize="on"
                            autoCorrect="off"
                            autoComplete="off"
                            spellCheck="off"
                            required/>
                        <br/>
                        <label htmlFor='email'>Email</label>
                        <br/>
                        <input 
                            name='email' 
                            placeholder='John.Doe@iitr.ac.in' 
                            type='email'
                            id='inputEmail'
                            value={email}
                            onChange={this.onChange}
                            autoCapitalize="on"
                            autoCorrect="off"
                            autoComplete="off"
                            spellCheck="off"
                            required/>
                        <br/>
                        <label htmlFor='helpBox'>How can we help?</label>
                        <br/>
                        <textarea 
                            name='query' 
                            placeholder='Hello I am John.'
                            id='inputQuery'
                            value={query}
                            onChange={this.onChange}
                            autoCapitalize="on"
                            autoCorrect="off"
                            autoComplete="off"
                            spellCheck="off"
                            required />
                        <br/>
                        <Button type='submit' text='Get In Touch' />
                    </form>
                </div>
            </div>
         );
    }
}
 
export default Contact;