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
    }
  }

  onInputChange=(event)=>{
    console.log(event.target.value)
  }
  onSubmit=()=>{
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
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
        <FaceRecognition/> 
      </div>
    );
  }
  
}

export default App;
