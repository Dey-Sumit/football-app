import React, { useEffect } from 'react';
import IntroPage from './components/intro/IntroPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home/Home';
import Settings from './components/settings/Settings';
import { useGlobalState } from './context/StateProvider';
import AuthPage from './components/authPage/Authpage';
import { auth } from 'firebase';
import FixtureDetails from './components/fixtureDetails/FixtureDetails';






function App() {
  return (

    <div className="app">
      <Router>
        <Switch>

          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/fixtures/:fixture_id">
            <FixtureDetails />
          </Route>

          {/* welcome screen */}
          <Route path="/intro">
            <IntroPage />
          </Route>

          <Route exact path="/" component={AuthPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
