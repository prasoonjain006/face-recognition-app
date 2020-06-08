import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
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
        {/* <FaceRecognition/>  */}
      </div>
    );
  }
  
}

export default App;
