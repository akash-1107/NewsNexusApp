import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;
  // const apiKey = '5988b21a1da248dca29797a08e81b38e'
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0) //ye generalized  isiliye yaha likhe h
 
    return (
      <div>
        <Router>
        <NavBar/> 
   <LoadingBar height={3} color='#f11946' progress={progress} />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={0} key="general" pageSize={pageSize} country="in" category="general"/></Route> 

          <Route exact path="/business"><News setProgress={setProgress} apiKey={1} key="business" pageSize={pageSize} country="in" category="business"/></Route>

          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={2} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/></Route> 

          <Route exact path="/sports"><News setProgress={setProgress} apiKey={3} key="sports" pageSize={pageSize} country="in" category="sports"/></Route> 

          <Route exact path="/health"><News setProgress={setProgress} apiKey={4} key="health" pageSize={pageSize} country="in" category="health"/></Route>
           
          <Route exact path="/science"><News setProgress={setProgress} apiKey={5} key="science" pageSize={pageSize} country="in" category="science"/></Route>
        </Switch>
        </Router>
      </div>
    )
 
}

export default App;