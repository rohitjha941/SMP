import React, { Component } from 'react';
import Heading  from './heading'
import Questions from './questions'
import Contact from './contact'
// import './src/index.css'

export default class Queries extends Component {
    constructor(){
        super();
    }

    render() {
        return(
            <div className='queries'>
                <Heading />
                <Questions />
                <Contact />
            </div>
        )
    }
}