import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import HomeComponent from './containers/Home';
import ShowRestaurantComponent from './containers/ShowRestaurant';
import MealComponent from './containers/Meal';
import RestaurantOwnerComponent from './containers/RestaurantOwner';
import LoginComponent from './containers/Login';
import SignupComponent from './containers/Signup';
import UsersComponent from './containers/Users';
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
            <Link to="/home">All Restaurants</Link>
          </li>
        </ul>
      <div className="mt-4 mb-4">
        <Route exact path="/" component={App} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/home" component={HomeComponent} />
        <Route path="/signup" component={SignupComponent} />
        <Route path='/restaurant/:id' component={ShowRestaurantComponent} />
        <Route path="/meal" component={MealComponent} />
        <Route path="/meal-edit/:id" component={MealComponent} />
        <Route path="/owner" component={RestaurantOwnerComponent} />
        <Route path="/users" component={UsersComponent} />
      </div>
    </Router>
  </ReduxProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
