import React from 'react';

/**
 * This only contains the Signout button 
 */
const navigation=({onRouteChange})=>{
    return(
        <nav style={{display :'flex', justifyContent:'flex-end'  }  }   >
            <p  onClick={()=>onRouteChange('signIn')} 
                className='f3 link dim black underline pa2 pt1 pb0 pointer' > Sign Out</p>
        </nav>
    )
}
export default navigation;