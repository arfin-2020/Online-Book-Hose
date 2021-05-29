import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import Buy from "./components/Buy/Buy";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Order from "./components/Order/Order";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
     <Router>
     <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRouter path="/book/:id">
              <Buy/>
            </PrivateRouter>
            <PrivateRouter path="/addproduct">
            <AddProduct/>
            </PrivateRouter>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/order">
              <Order/>
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;
