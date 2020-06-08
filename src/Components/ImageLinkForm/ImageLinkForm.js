import React from 'react';
import './ImageLinkForm.css';

const imageLinkForm=({onInputChange,onSubmit})=>{
    return(
        <div>
            <p className='f4 b light-green'>
                {'This will detect faces in your picture. Give it a try !!'}
            </p>
            <div className=" shadow-5 pa1 form center">
                <input  className="f4 br3 p2 w-70 center" type='text' 
                        onChange={onInputChange} />
                <button className="w-25 br3 b pa2 grow f4 link ph3 dib gold bg-dark-red"
                        onClick={onSubmit} >Detect Face</button>
            </div>


        </div>
    )
}
export default imageLinkForm;