import React from 'react';

const FaceRecognition=({imageUrl})=>{
    return(
        <div className="center ma pt2">
            <img   id='inputImage'  width="40%" alt='aaa' src={imageUrl}/>
        </div>
        
    )
}
export default FaceRecognition;