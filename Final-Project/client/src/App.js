import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Welcome from './components/Welcome/Welcome'
import Home from './components/Home/Home'
import { getSession } from './session'

import { io } from "socket.io-client";
import Peer from 'peerjs';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export const socket = io("localhost:5000");
export const peer = new Peer(getSession())
export default App;
