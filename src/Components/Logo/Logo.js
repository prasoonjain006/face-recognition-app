import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo1 from './logo1.png';

const Logo=()=>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 ,scale:1.2}} style={{ height: 110, width: 110 }} >
                <div className="Tilt-inner">
                    <img className="pa3"  src={logo1} width="80px" alt='logo'></img> 
                </div>
            </Tilt>

        </div>
    )
}
export default Logo;