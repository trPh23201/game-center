import './App.css';
import Menubar from './components/Menubar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeaderBoard from './pages/LeaderBoard';
import Games from './pages/Games';

function App() {
  return (
    <Router>
      <div className="navbar">
        <Menubar />
      </div>
      <Switch>
        <Route path='/' component={HomePage} exact></Route>
        <Route path='/games' component={Games}></Route>
        <Route path='/leaderboard' component={LeaderBoard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
