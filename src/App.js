import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';


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
  
  calculateFaceLocation =(data)=>{
    const claFace = data.outputs[0].data.regions[1].region_info.bounding_box;
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
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
  displayFaceBox =(box)=>{
    console.log(box);
    this.setState({box:box})
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }

  onReset=()=>{
    this.setState({
      input:'',
      imageurl:'',
    })
  }  
 
  onSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    fetch('http://localhost:3001/imageurl',{
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        input:this.state.input,
      })
    }).then(resp=> resp.status===400? this.setState({badReq:true}): resp)
    .then(response=>response.json())
    .then(response =>{
      if(response){
        fetch('http://localhost:3001/image',{
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
            id:this.state.data.id,
          })
        })
        .then(response =>response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.data,{entries:count}))
        })
        .catch(console.log);
    } 
    this.setState(this.onRouteChange('home'));
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err =>console.log('wrong address'));
}

  onRouteChange=(route)=>{
    if(route==='signIn'){
      this.setState(initialState);
    }
    this.setState({route:route})
  }
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
        
        {route === 'home'
          ?  <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Logo   name={this.state.data.name}
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
              route==='signIn'
              ? <SignIn  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
            )
            
        }
      </div>
    );
  }
  

}

export default App;
