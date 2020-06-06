import React from 'react';

const imageLinkForm=()=>{
    return(
        <div>
            <p className='f3'>
                {'This will detect faces in your picture. Give it a try !!'}
            </p>
            <div>
                <input type='text' />
                <button>Detect</button>
            </div>


        </div>
    )
}
export default imageLinkForm;