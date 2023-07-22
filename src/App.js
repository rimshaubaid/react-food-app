import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicRoute from "./components/PublicRoute/PublicRoute";
import { Provider } from "react-redux";
import Promo from './pages/Promo/promo';
import store from "./store";
import OrderHistory from "./pages/Order-history/Order-history";
import HomePage from "./pages/Homepage/Homepage.js";
import MenuItems from "./pages/MenuItems/MenuItems";
import Outlets from "./pages/Outlets/Outlets";
import Payment from "./pages/Payment/Payment";
import Account from "./pages/Account/Account";
import TrackOrder from "./pages/Track-order/Track-order";
import StripePayment from './pages/Payment/CardMinimal';

// if (localStorage.headers) {
//   store.dispatch(setCurrentUser(localStorage.headers));
// }

const App = () => {
  const routesKeys = [];
  for (let route in routes) {
    routesKeys.push(route);
  }
   

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/menus/:id" component={MenuItems} />
          <PublicRoute exact path="/outlets" component={Outlets} />
          <PublicRoute exact path="/payment/:id?" component={Payment} />
          <PublicRoute exact path="/account" component={Account} />
          <PublicRoute exact path="/promo" component={Promo} />
          <PublicRoute exact path="/stripe" component={StripePayment} />
          
       <PublicRoute
            exact
            path="/order-history/:id?"
            component={OrderHistory}
          />
         <PublicRoute
            exact
            path="/track-order/:id?"
            component={TrackOrder}
          />
     
          {routesKeys.map((key) => {
            return (
              <PublicRoute
                path={`${routes[key].path}`}
                component={routes[key].component}
                key={key}
                exact={routes[key].exact}
                name={routes[key].name}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
