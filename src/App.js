import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Transformers from './components/Transformers';
import AddTransformer from './components/AddTransformer';
import TransformerDetails from './components/TransformerDetails';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="app-main">
          <Router>
            <Switch>
              <Route exact path="/" component={Transformers} />
              <Route exact path="/add-transformer/" component={AddTransformer} />
              <Route exact path="/details/:id" component={TransformerDetails} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
      </div>

    </div>

  );
}

export default App;
