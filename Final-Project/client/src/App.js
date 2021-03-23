import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Welcome from './components/Welcome/Welcome'
import Home from './components/Home/Home'
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

export default App;
