import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';


function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <ImageLinkForm/>
      {/* <FaceRecognition/>  */}

    </div>
  );
}

export default App;
