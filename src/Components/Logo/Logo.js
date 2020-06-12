import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo1 from './logo3.jfif';

const Logo=()=>{
    return(
        <div className="ml2 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 ,scale:1.2}} style={{ height: 118, width: 120 }} >
                <div className="Tilt-inner">
                    <img className="pa2"  src={logo1} style={{ height: 100, width: 100 }} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;