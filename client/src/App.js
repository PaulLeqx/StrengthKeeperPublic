import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import "./App.scss";

import Dashboard from './containers/Dashboard';
import Home from "./containers/Home";
import Trainings from "./containers/Trainings";
import ForgotPassword from "./containers/ForgotPassword";
import Activation from './containers/Activation';
import CreateTraining from "./containers/CreateTraining";
import UpdateTraining from "./containers/UpdateTraining";
import About from "./containers/About";
import PageNotFound from './components/PageNotFound';
import ResetPassword from './containers/ResetPassword';

const App = ({ logged }) => {
  return (
    <div className="app">
      <Router>
          <>
            <div className="app-container">
              <div className="app-wrapper">
                <Switch>
                  <Route exact path="/">
                    {logged ? 
                      <Redirect to="/dashboard" /> : <Home />
                    }
                  </Route>
                  <Route exact path="/dashboard">
                    {logged ?
                      <Dashboard /> : <Redirect to="/" />
                    }
                  </Route>
                  <Route exact path="/dashboard/trainings">
                    {logged ? 
                      <Trainings /> : <Redirect to="/" /> 
                    }
                  </Route>
                  <Route exact path="/dashboard/trainings/create">
                    {logged ? 
                      <CreateTraining /> : <Redirect to="/" />
                    }
                  </Route>
                  <Route exact path="/dashboard/trainings/update/:id">
                    {logged ? 
                      <UpdateTraining /> : <Redirect to="/" />
                    }
                  </Route>
                  <Route exact path="/about"><About /></Route>
                  <Route exact path="/forgotpassword" component={ForgotPassword} />
                  <Route exact path="/activation/:activationToken" component={Activation} />
                  <Route exact path="/passwordreset/:resetToken" component={ResetPassword} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
          </>
      </Router>
    </div>
  );
}

App.propTypes = {
  logged: PropTypes.bool.isRequired,
}

export default App;
