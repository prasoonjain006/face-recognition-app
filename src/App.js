import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Profile from './Components/Profile/Profile';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

/**options for background particles */
const ParticlesOptions={
  Particles: {
    "number": {
      "value": 50
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}
/**This is the initial state , Everything is null*/
const initialState={
input:"",
  imageUrl:"",
  box:{},
  route: 'signIn',
  badReq:false,
  user:{
    email:'',
    id:'',
    name:'',
    entries:0,
    joined:'',
  }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({data: {
        email:data.email,
        id:data.id,
        name:data.name,
        entries:data.entries,
        joined:data.joined,
    }})
  }
  /**
   * This function will receive data of API call
   * Here data we receive is corner points of the face box
   */
  calculateFaceLocation =(data)=>{
    const claFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width =Number(image.width);
    const height=Number(image.height);
    console.log(width, height);
    return{
      leftCol:claFace.left_col*width,
      topRow:claFace.top_row*height,
      rightCol: width-(claFace.right_col * width),
      bottomRow:height-(claFace.bottom_row*height),
    }
  }
  /**
   * recieve data returned from the calculateFaceLocation function
   * Box is a object of 4 points.
   */
  displayFaceBox =(box)=>{
    this.setState({box:box})
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }


  /**
   * This function will be called from the imageLinkForm Component on clicking search-again button
   * This will clear current value of input
   */
  onReset=()=>{
    this.setState({
      input:'',
      imageurl:'',
    })
  }  

  /**
   * This will also be called from imageLinkForm Component, on clicking detect-button
   * This will call Clarifai API , imageurl is value entered by user
   */
  onSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    fetch('http://localhost:3001/imageurl',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        input:this.state.input,
      })
    }).then(resp=> resp.status===400? this.setState({badReq:true}): resp)     /**to handle bad request i.e wrong url entered */
    .then(response=>response.json())              
    .then(response =>{
      if(response){                               /**if url entered is correct and contains any image  move ahead */
        fetch('http://localhost:3001/image',{
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            id:this.state.data.id,                /**get ID of user to increase their entry count if they search an image */
          })
        })
        .then(response =>response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.data,{entries:count}))   /**update Entry count on every image search */
        })
        .catch(console.log);
    } 
    this.setState(this.onRouteChange('home'));                        /** route 'home' is the main page of the app */
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err =>console.log('wrong address'));
}

  /**
   * this takes route as an input such as 'home' and 'signIn' to direct the user to respective page
   */
  onRouteChange=(route)=>{
    if(route==='signIn'){
      this.setState(initialState);
    }
    this.setState({route:route})
  }

  /**
   * This function will be called in imageLinkForm component , when user clicks search again button
   * This will hide the incorrect address warning in the app.
   */
  changeReq=()=>{
    this.setState({badReq:false})
  }
  
  render(){
    const {imageUrl, route , box} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={ParticlesOptions} 
        />
        {route === 'home'           /**If route is main page of the app i.e if user is signed-in */
          ?  <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Profile  name={this.state.data.name}
                        email={this.state.data.email}
                        entries={this.state.data.entries}
                        joined={this.state.data.joined}
                        id={this.state.data.id} />
              <Rank  name={this.state.data.name} 
                     entries={this.state.data.entries} />
              <ImageLinkForm badReq={this.state.badReq}
                             changeReq={this.changeReq}
                             onReset={this.onReset} 
                             searchChange={this.searchChange} 
                             onSubmit={this.onSubmit}  
                             onInputChange={this.onInputChange}  />
              <FaceRecognition box={box} imageUrl={imageUrl}/> 
            </div>
          : (
              route==='signIn'                                                           /**If route is Sign-in page of the app i.e if user is signed-OUT */
              ? <SignIn  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>  /**If route is register page of the app i.e if user wants to register */
            )
        }
      </div>
    );
  }
}
export default App;
