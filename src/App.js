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
import Clarifai from 'clarifai';

const app =new Clarifai.App({
  apiKey :'cf9d81ddd7344f4797e16fdca400dbcb'
})


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
// cf9d81ddd7344f4797e16fdca400dbcb
class App extends Component {
  constructor(){
    super();
    this.state={
      input:"",
      imageUrl:"",
      box:{},
      route: 'signIn',
      user:{
        email:'',
        id:'',
        name:'',
        entries:0,
        joined:'',
      }
    }
  }

  loadUser=(data)=>{
    // console.log(data);
    this.setState({data: {
        email:data.email,
        id:data.id,
        name:data.name,
        entries:data.entries,
        joined:data.joined,
    }})
  }

  componentDidMount(){
    fetch('http://localhost:3001')
      .then(response=> response.json())
        .then(console.log)
  }
  
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
  displayFaceBox =(box)=>{
    console.log(box);
    this.setState({box:box})
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }
  onSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3001/image',{
          method:'put',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({
          id:this.state.user.id,
        })
        })
    } 
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err =>console.log(err));
}

  onRouteChange=(route)=>{
    this.setState({route:route})
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
              <Logo/>
              <Rank  name={this.state.data.name}  entries={this.state.data.entries} />
              <ImageLinkForm  onSubmit={this.onSubmit}  onInputChange={this.onInputChange}  />
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
