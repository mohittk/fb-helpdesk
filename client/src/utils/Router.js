import React from 'react'; // Import React
import {Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import AgentScreen from '../pages/AgentScreen';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/agent" element={<AgentScreen />} />
    </Routes>
  );
}

export default App;
