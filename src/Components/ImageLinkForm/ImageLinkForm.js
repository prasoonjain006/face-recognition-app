import React from 'react';
import './ImageLinkForm.css';

const imageLinkForm=({onInputChange,onSubmit})=>{
    return(
        <div>
            <p className='f4 b light-green'>
                {'This will detect faces in your picture. Give it a try !!'}
            </p>
            <div className ='center'>
            <div className=" shadow-5 pa1 br3 w-90 form center">

                <input  className="f4 br3 w-60 center" type='text' 
                        onChange={onInputChange}  />
                <button className="w-30 br3 b pa1 grow ml1 f4 link ph3 dib gold bg-dark-red"
                        onClick={onSubmit} >Detect</button>
            </div>
            </div>


        </div>
    )
}
export default imageLinkForm;