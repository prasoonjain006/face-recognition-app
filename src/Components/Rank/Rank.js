import React from 'react';


const Rank=({name,entries})=>{
    return(
        <div>
           <div className="white b f3" >
               {`${name}, Your current entry count is...`}
           </div>
           <div className="white f2" >
               {entries}
           </div>
           
        </div>
    )
}
export default Rank;