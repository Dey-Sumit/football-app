import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { toast } from 'react-toastify';

import Settings from './components/settings/Settings';
import AuthPage from './components/authPage/Authpage';
import FixtureDetails from './pages/fixtureDetails/FixtureDetails';
import ChooseTeam from './pages/chooseTeams/ChooseTeam';
import Home from './pages/home/Home';
import Others from './pages/others/Others';
import Navbar from './components/navbar/Navbar';

import store from './redux/store';
import { load_user } from './redux/actions/auth.action';
import ProtectedRoute from './components/ProtectedRoute';


toast.configure()

const withContainer = () => {
  return (
    <div>
      <div className="container__main">
        <ProtectedRoute exact path="/settings" component={Settings} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/fixtures/:fixture_id" component={FixtureDetails} />
        <ProtectedRoute exact path="/others" component={Others} />
        {/* <Route render={() => <h1>404 not found</h1>} /> */}
      </div>
      <Navbar />

    </div>
  )
}

function App() {

  useEffect(() => {
    console.log("APP use effect");
    //! you can also dispatch directly using store without connect
    store.dispatch(load_user());
  }, [])

  return (
    <Switch>
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/choose_teams" component={ChooseTeam} />
      <Route component={withContainer} />

    </Switch>
  );
}
export default App;
