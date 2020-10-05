import React, { useEffect } from 'react';
import ChooseTeam from './components/intro/ChooseTeam';
import { Route, Switch } from 'react-router-dom'
import Home from './components/home/Home';
import Settings from './components/settings/Settings';
import { useGlobalState } from './context/StateProvider';
import AuthPage from './components/authPage/Authpage';
import FixtureDetails from './components/fixtureDetails/FixtureDetails';
import { toast } from 'react-toastify';
import { types } from './context/reducer';
import { withRouter } from 'react-router-dom'
import Others from './pages/others/Others';
import Navbar from './components/navbar/Navbar';

toast.configure()

function App({ history }) {

  const [, dispatch] = useGlobalState()

  // set the global state
  useEffect(() => {
    if (localStorage["FOOTBALL_APP-USER"]) {
      dispatch(
        {
          type: types.SET_USER,
          payload: localStorage["FOOTBALL_APP-USER"],
        }
      )
    }
    if (localStorage["FOOTBALL_APP-MYTEAM"]) {
      dispatch(
        {
          type: types.ADD_TO_MY_TEAM,
          payload: JSON.parse(localStorage["FOOTBALL_APP-MYTEAM"]),
        }
      )
    }

  }, [dispatch, history])



  return (
    <div className="app">
      <Switch>
        <Route path="/settings">
          <Settings />
          {/* <Navbar /> */}
        </Route>
        <Route exact path="/">
          <Home />
          {/* <Navbar /> */}
        </Route>
        <Route exact path="/others">
          < Others />
          <Navbar />
        </Route>
        <Route path="/fixtures/:fixture_id">
          <FixtureDetails />
          <Navbar />
        </Route>
        <Route path="/teams">
          <ChooseTeam />
        </Route>
        <Route exact path="/auth" component={AuthPage} />
      </Switch>

    </div>
  );
}

export default withRouter(App);
