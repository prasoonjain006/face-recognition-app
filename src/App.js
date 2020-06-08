import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
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
    }
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }
  onSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
  );
  }
  render(){
    return (
      <div className="App">
        <Particles className="particles"
          params={ParticlesOptions} 
        />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm  onSubmit={this.onSubmit}  onInputChange={this.onInputChange}  />
        <FaceRecognition imageUrl={this.state.imageUrl}/> 
      </div>
    );
  }
  
}

export default App;
