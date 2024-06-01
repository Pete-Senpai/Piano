import React from 'react';
import './App.css';
import Piano from './Piano';
import {ShowNote} from './ShowNote';

const App: React.FC = () => {
  return (
      <div className="App">
          <h1>Realistic Piano</h1>
          <Piano />
      </div>
  );
};

export default App;
