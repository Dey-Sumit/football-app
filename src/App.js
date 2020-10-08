import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
// import Home from './components/home/Home';


import Settings from './components/settings/Settings';
import AuthPage from './components/authPage/Authpage';
import FixtureDetails from './pages/fixtureDetails/FixtureDetails';
import { toast } from 'react-toastify';
import ChooseTeam from './pages/chooseTeams/ChooseTeam';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import store from './redux/store';
import { load_user } from './redux/actions/auth.action';
import Others from './pages/others/Others';
import { Container } from 'react-bootstrap';
// import Others from './pages/others/Others';
// import Navbar from './components/navbar/Navbar';

toast.configure()

const withContainer = () => {
  return (
    <Container fluid>
      <div className="container__main">
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/" component={Home} />
        <Route path="/fixtures/:fixture_id" component={FixtureDetails} />
        <Route exact path="/others" component={Others} />
      </div>
      <Navbar />
    </Container>
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
