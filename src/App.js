import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
// import Home from './components/home/Home';


import Settings from './components/settings/Settings';
import AuthPage from './components/authPage/Authpage';
// import FixtureDetails from './components/fixtureDetails/FixtureDetails';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom'
import ChooseTeam from './pages/chooseTeams/ChooseTeam';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import store from './redux/store';
import { load_user } from './redux/actions/auth.action';
// import Others from './pages/others/Others';
// import Navbar from './components/navbar/Navbar';

toast.configure()


function App() {

  useEffect(() => {
    console.log("APP use effect");
    //! you can also dispatch directly using store without connect
    store.dispatch(load_user());
  }, [])



  return (

    <Switch>
      <Route exact path="/auth" component={AuthPage} />

      <Route exact path="/settings">
        <Settings />
        <Navbar />
      </Route>

      <Route exact path="/choose_teams">
        <ChooseTeam />
      </Route>

      <Route exact path="/">
        <Home />
        <Navbar />
      </Route>

    </Switch>




  );
}

{/* 
        <Route exact path="/">
          <Home />
          
        </Route>
        <Route exact path="/others">
          < Others />
          <Navbar />
        </Route>
        <Route path="/fixtures/:fixture_id">
          <FixtureDetails />
          <Navbar />
        </Route>
         */}
export default App;
