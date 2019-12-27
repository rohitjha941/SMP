import React, { Component } from 'react';
import Button from '../../components/Button';
import styles from './contact.module.scss';
class Contact extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            query:'',
        }
    }
    onChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value })
    }
    onSubmit = () => {
        // let data = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     query: this.state.query
        // }
    }
    render() {
        let email = this.state.email;
        let name = this.state.name;
        let query = this.state.query; 
        return ( 
            <div className={styles.contact}>
                <div className={styles.contactTitle}>Need More Help? <span className='color-red'>Contact Us</span></div>
                <div className={styles.contactForm}>
                    <form>
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
                        <Button onClick={this.onSubmit()} text='Get In Touch' />
                    </form>
                </div>
            </div>
         );
    }
}
 
export default Contact;