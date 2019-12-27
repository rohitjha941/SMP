import React ,{Component} from 'react';
import MobileView from './MobileView';
import DesktopView from './DesktopView';

class Footer extends Component {
    constructor(){
        super();
        this.state ={
            mobileView : window.innerWidth < 600
        }
    }
    render() { 
        return ( 
            <>
                {
                    this.state.mobileView ? 
                        <MobileView />
                    :
                        <DesktopView />
                }
            </>
         );
    }
}
 
export default Footer;