import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navi from './Navi';
import Footer from './Footer';
import Index from './Index';
import About from './About';
import Contact from './Contact';



class App extends Component{

      render(){
          return (
            <BrowserRouter>
              <div>
                <Navi />
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                </Switch>
                <Footer />
              </div>
            </BrowserRouter>
          );
      }
}
ReactDOM.render(<App />, document.getElementById('app'));
