import React, { Component } from 'react';
import styles from './About.module.scss';
import TeamCard from '../../components/TeamCard';
import Button from '../../components/Button';
class Team extends Component {
    member=[
        {
            name:'Apan Jain' ,
            image:require('assets/images/profile.jfif'), 
            designation:'Developer',
            fb:'https://www.facebook.com/apan.jain.75', 
            contact:'9166134565'
        },
        {
            name:'Apan Jain' ,
            image:require('assets/images/profile.jfif'), 
            designation:'Developer',
            fb:'https://www.facebook.com/apan.jain.75', 
            contact:'9166134565'
        },
        {
            name:'Apan Jain' ,
            image:require('assets/images/profile.jfif'), 
            designation:'Developer',
            fb:'https://www.facebook.com/apan.jain.75', 
            contact:'9166134565'
        },
        {
            name:'Apan Jain' ,
            image:require('assets/images/profile.jfif'), 
            designation:'Developer',
            fb:'https://www.facebook.com/apan.jain.75', 
            contact:'9166134565'
        }
    ]

    render() { 
        return ( 
            <>
                <div className={styles.teamHeading}>
                    Team <span className='color-red'>SMP</span>
                </div>
                <div className={styles.teamCardContainer}>
                    <ul>
                        {this.member.map((member,i) => {
                            return(
                                <li key={i}><TeamCard key={i} member={member} /></li>
                            )
                        })}
                    </ul>
                </div>
                <Button className={styles.viewMore} text='View More' type='outline'/>
            </>
         );
    }
}
 
export default Team;