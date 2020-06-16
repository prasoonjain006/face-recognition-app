import React from 'react';
import './ImageLinkForm.css';

class imageLinkForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inputField:'',
            canSearch:true,
        }
    }

    updateValue=(event)=>{
        this.setState({
            inputField:event.target.value,  
        })
        this.props.onInputChange(event);
    }
    onDetect=()=>{
        this.props.onSubmit();
        this.setState({
            canSearch:false,
        })
    }

    reset=()=>{
        this.props.onReset();
        this.setState({
            inputField:'',
            canSearch:true,
        })
        
    }
    render(){
    
        return(
            <div>
                <p className='f4 b light-green'>
                    {'This will detect faces in your picture. Give it a try !!'}
                </p>
                {this.state.canSearch===true
                ?   <div className='white'>
                    copy and paste the image link here
                    </div>
                :<p></p>
                }
                
                <div className ='center'>
               
                    <div className=" shadow-5 pa1 br3 w-90 form center">
                        
                        <input  className="f4 br3 w-60 center blue" type='text' value={this.state.inputField}
                                onChange={this.updateValue    }  />
                        

                        {this.state.canSearch===true && this.state.inputField!==''
                        ?   (
                            <button className="w-30 br3 b grow link dib gold bg-dark-red"
                                    onClick={this.onDetect} >Detect</button>
                        )
                        :<p></p>
                        }

                        

                        {/* <button className='pa1 br3 dib gold' onClick={this.reset}>again</button> */}
                    </div>
                    {this.state.canSearch===false
                    ?   <button className='pa1 br3 bg-purple dib gold' onClick={this.reset}>Search again</button>
                    :<p></p>
                    }
                </div>


            </div>
        )
    }
}
export default imageLinkForm;