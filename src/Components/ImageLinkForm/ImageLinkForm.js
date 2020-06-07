import React from 'react';
import './ImageLinkForm.css';

const imageLinkForm=()=>{
    return(
        <div>
            <p className='f3'>
                {'This will detect faces in your picture. Give it a try !!'}
            </p>
            <div className=" shadow-5 pa3 form center">
                <input  className="f4 br3 p2 w-70 center" type='text' />
                <button className="w-25 br3 b grow f4 link ph3 dib red bg-light-green" >Detect Face</button>
            </div>


        </div>
    )
}
export default imageLinkForm;