import React from 'react';
import './ImageLinkForm.css';

class imageLinkForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inputField:'',
            canSearch:true,
            needHelp:false,
        }
    }
    helpNeed=()=>this.setState({needHelp:true});

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
        this.props.changeReq();
        this.setState({
            inputField:'',
            canSearch:true,
            needHelp:false,
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
                    Copy the address of any picture and paste it here
                    
                    </div>

                :<p></p>
                }
                <div className ='center'>
                    <div className=" shadow-5 pa1 br3 w-90 form center">
                    {/* <button onClick={this.helpNeed} className='bg-dark-red white b shadow-5 pa2 link dib pr3 pl3 br3' >Need Help</button> */}
                        <input  className="f4 br3 w-60 center blue" type='text' value={this.state.inputField}
                                onChange={this.updateValue    }  />
                        

                        {this.state.canSearch===true && this.state.inputField!==''
                        ?   (
                            <button className="w-30 br3 b grow link dib gold bg-dark-red"
                                    onClick={this.onDetect} >Detect</button>
                        )
                        :<p></p>
                        }

                    </div>
                    {this.state.canSearch===false
                    ?   <button className='pa1 br3 bg-purple dib gold' onClick={this.reset}>Search again</button>
                    :<p></p>
                    }
  
                </div>
                {this.props.badReq===true
                    ?   <div className='white'>
                            <p className='gold f3 shadow-5 b'  >Ooops, you might entered a wrong link, please try again </p>
                            <button onClick={this.helpNeed} className='bg-dark-red white b shadow-5 pa2 link dib pr3 pl3 br3' >Need Help</button>
                            {this.state.needHelp===true
                            ?    <div className='f4'>
                                    <p>Copy the address of any image that contains a face.</p>
                                    <p >You can find such images </p> <a  target='blank' className='m0 pa0 gold f3'  href="https://www.bing.com/images/search?q=faces&qs=n&form=QBIR&sp=-1&pq=face&sc=8-4&sk=&cvid=7C93655C602042A79E4FE9654366E723">Here</a>
                                    <p>Paste that link in the above box and click on detect</p>
                                </div>
                            :<p></p>
                            }

                        </div>
                    :<p></p>
                }
                


            </div>
        )
    }
}
export default imageLinkForm;