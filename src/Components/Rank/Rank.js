import React from 'react';


const Rank=({name,entries})=>{
    return(
        <div>
           <div className="gold b f2" >
               {` Hello ${name} `}
           </div>
           <div className="white f3 pb2" >
               {`Your current entry count is : ${entries}`}
           </div>
           
        </div>
    )
}
export default Rank;