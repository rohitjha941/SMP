import React, { Component } from 'react';
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
        if (name === 'contact' && value) {
            value = value.trim()
            value = value.substring(0, 10)
        }
        this.setState({ [name]: value })
    }
    onSubmit = () => {
        let data = {
            name: this.state.name,
            email: this.state.email,
            query: this.state.query
        }
    }
    render() {
        let email = this.state.email;
        let name = this.state.name;
        let query = this.state.query; 
        return ( 
            <div className='contact'>
                <div className='contact-title'>Need More Help? <span className='color-red'>Contact Us</span></div>
                <div className='contact-form'>
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
                            name='helpBox' 
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
                        <button type='submit' onClick={this.onSubmit()}>Get In Touch</button>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default Contact;