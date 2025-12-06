import { useState } from 'react'
//import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './Components/Nav';
import Routes from './Components/Routes';
import Venues from './Components/Venues';
import Teams from './Components/Teams'
import TeamPlayers from './Components/TeamPlayers'
import Player from './Components/Player'
// import Players from './Components/Players';
// import CurrentWeek from './Components/CurrentWeek';
// import Scores from './Components/Scores';
// import Standings from './Components/Standings';
// import Login from './Components/Login';
import Footer from "./Components/Footer";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = 'App'>
      <BrowserRouter>
      <Nav />
      <hr />
      <Switch>
        <Route path="/" exact component={Routes} />
          <Route path="/routes" component={Routes} />
          <Route path="/venues" component={Venues} />
          <Route path="/teams" component={Teams} />
          <Route path="/teamPlayers/:teamName/:teamAbbreviation" component={TeamPlayers} />
          <Route path="/player/:id" component={Player} />

          {/*<Route path="/players" component={Players} />
          <Route path="/currentWeek" component={CurrentWeek} />
          <Route path="/scores" component={Scores} />
          <Route path="/standings" component={Standings} />
          <Route path="/login" component={Login} /> */}
      </Switch>        
    </BrowserRouter>
    <Footer/>
    </div>
  )
}

export default App;
