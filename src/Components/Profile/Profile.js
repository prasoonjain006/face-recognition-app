import React from 'react';
import Tilt from 'react-tilt';
import './Profile.css';
import logo1 from './logo3.jfif';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showProfile:false,
        }
    }

    /** When show profile button is clicked */
    onViewProfile=()=> this.setState({showProfile:true})

    //** When Back button is clicked */
    onBackProfile=()=>this.setState({showProfile:false})
    

    render(){
        const {name, email, entries, joined,id}=this.props;
        return(
            <div>
                {/** Buttons for show profile and back from profile*/}
                <div className='tl ma2' >
                {this.state.showProfile===false
                    ?   <button onClick={this.onViewProfile} className='bg-dark-red white ma2  b shadow-5 pa1 link dib pr3 pl3 br3'>View Profile</button>
                    :   <button onClick={this.onBackProfile} className='bg-dark-green white ma2  b shadow-5 pa1 link dib pr3 pl3 br3'>Back</button>
                }
                </div>

                {/** Container for logo and profile box*/}
                <span className="mt3  container ">
                    <Tilt className="Tilt br2 shadow-2" options={{ max : 35 ,scale:1.2}} style={{ height: 118, width: 120 }} >
                        <span className="Tilt-inner">
                            <img className="pa2"  src={logo1} style={{ height: 100, width: 100 }} alt='logo'/>
                        </span>
                    </Tilt>
                    {this.state.showProfile===true              /** If profile button is clicked, display profile boxes */
                        ? <>
                            <span className='profile f4 white shadow-3 pa2 ma2  b br3 tl'>
                                <p> id : {id} </p>
                                <p> Name : {name}</p>
                                <p> Joined : {joined}</p>
                            </span>
                            <span className='profile f4 white shadow-3 pa2 ma2 b br3 tl' >
                                <p> Entries made : {entries}</p>
                                <p> Email : {email}   </p>
                            </span>
                        </>
                        :<p></p>
                    }
                </span>
            </div>
        )
    }
}
export default Profile;