import React from 'react';

import './scss/App.scss';
import './scss/Form.scss';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Profile from './components/Profile'

function App() {
 
  return (
    <Router>
      <Header />
      <div className="App">
          
          <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />

          </Switch>
          
      </div>
    </Router>
  );

}


export default App;
