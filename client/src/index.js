import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import SignupContainer from './containers/Containers';
import { HomeContainer } from './containers/Containers';
import { MealContainer } from './containers/Containers';
import { LoginContainer } from './containers/Containers';
import { UsersContainer } from './containers/Containers';
import { UserContainer } from './containers/Containers';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const routing = (
  <ReduxProvider store={reduxStore}>
    <Router>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      <div className="mt-4 mb-4">
        <Route exact path="/" component={App} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/home" component={HomeContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/meal" component={MealContainer} />
        <Route path="/meal-edit/:id" component={MealContainer} />
        <Route path="/users" component={UsersContainer} />
        <Route path="/user" component={UserContainer} />
        <Route path="/user-edit/:id" component={UserContainer} />
      </div>
    </Router>
  </ReduxProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
