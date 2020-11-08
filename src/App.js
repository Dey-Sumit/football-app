import React from 'react';
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
import ChatPage from './pages/chatPage/ChatPage';

//REMOVE Toast
toast.configure()
store.dispatch(load_user());

const withContainer = () => {
  return (
    <div>
      <div className="container__main">
        <ProtectedRoute exact path="/settings" component={Settings} />

        <ProtectedRoute exact path="/fixtures/:fixture_id" component={FixtureDetails} />
        {/* <ProtectedRoute exact path="/others" component={Others} /> */}
        <ProtectedRoute exact path="/others" component={ChatPage} />
        <ProtectedRoute exact path="/" component={Home} />
        {/* <Route render={() => <h1>404 not found</h1>} /> */}
      </div>
      {/* // protected component */}
      <ProtectedRoute component={Navbar} />

    </div>
  )
}

function App() {
  return (
    <Switch>
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/choose_teams" component={ChooseTeam} />
      <ProtectedRoute exact path="/others" component={ChatPage} />
      <ProtectedRoute exact path="/fixtures/:fixture_id" component={FixtureDetails} />
      {/* <ProtectedRoute exact path="/others" component={Others} /> */}
      <ProtectedRoute exact path="/others" component={ChatPage} />
      <ProtectedRoute exact path="/settings" component={Settings} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  );
}
export default App;
