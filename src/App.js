
import ViewHome from './components/ViewHome'
import ViewBoard from './components/ViewBoard'
import ViewBoardList from './components/ViewBoardList'
import ViewControls from './components/ViewControls'
// CSS, split up only for my own sanity
import './index.css'
import './css/Collapsible.css'
import './css/Footer.css'
import './css/Lazy.css'
import './css/Scoreboard.css'
import './css/Scoreticker.css'
import './css/Tools.css'
import './css/Userlist.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <ViewHome />
          </Route>

          <Route path="/controls/:sbidParam?">
            <ViewControls type="controls" />
          </Route>

          <Route path="/waseda/:sbidParam?">
            <ViewControls type="waseda"/>
          </Route>
          
          <Route path="/board/:boardParam/:sbidParam?">
            <ViewBoard/>
          </Route>

          <Route path="/boardlist/:sbidParam?">
            <ViewBoardList/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;