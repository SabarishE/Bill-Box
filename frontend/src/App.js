import "./styles.css";
import logo from "./media/logo.png"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { useState } from "react";

import { ProtectedRoute } from "./components/protectedroute.js";
import { ProtectedRouteA } from "./components/protectedrouteA.js";

import { Homepage } from "./components/homepage";

import { Login } from "./components/login.js";
import { Signup } from "./components/signup.js";
import { Forgotpwd } from "./components/forgotpwd.js";
import { Resetpwd } from "./components/resetpwd.js";

import { Dashboard } from "./components/user-account/dashboard";
import { Newentry } from "./components/user-account/newentry.js";
import { Filters } from "./components/user-account/filters";
import { YourBox } from "./components/user-account/history.js";
import { Update } from "./components/user-account/update.js";

import { Admin } from "./components/admin-account/admin.js";

import ClipLoader from "react-spinners/ClipLoader";
import { Popup } from "./components/popup.js";

export default function App() {
  const [Pop, setPop] = useState("none");
  const [Popmsg, setPopmsg] = useState("");
  let [loading, setLoading] = useState(false);

  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");

  let [data, setdata] = useState({ user: { box: [] } });

  function getuserdata() {
    // -----fetch call for getting user data------

    fetch(
      `https://money-manager-sabarish.herokuapp.com/trackers/user/${email}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setdata(data);
        }
      })
      .catch((err) => {
        console.log("error in login >>>", err);
      });
  }

  return (
    <div className="App">
      <Router>
        <Header loading={loading} />

        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <Login
              setPop={setPop}
              setPopmsg={setPopmsg}
              setLoading={setLoading}
            />
          </Route>

          <Route exact path="/signup">
            <Signup
              setPop={setPop}
              setPopmsg={setPopmsg}
              setLoading={setLoading}
            />
          </Route>

          <Route eact path="/forgotpwd">
            <Forgotpwd
              setPop={setPop}
              setPopmsg={setPopmsg}
              setLoading={setLoading}
            />
          </Route>

          <Route path="/resetpwd">
            <Resetpwd
              setPop={setPop}
              setPopmsg={setPopmsg}
              setLoading={setLoading}
            />
          </Route>

          <ProtectedRoute
            exact
            path="/youraccount/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute exact path="/youraccount/add" component={Newentry} />
          <ProtectedRoute
            exact
            path="/youraccount/filters"
            component={Filters}
            data={data}
          />
          <ProtectedRoute
            exact
            path="/youraccount/history"
            component={YourBox}
            data={data}
            refresh={getuserdata}
          />
          <ProtectedRoute
            exact
            path="/youraccount/update"
            component={Update}
            data={data}
            refresh={getuserdata}
          />

          <ProtectedRouteA exact path="/adminaccount" component={Admin} />
          <Route path="*">
            <Homepage />
          </Route>
        </Switch>
      </Router>

      <Popup Pop={Pop} setPop={setPop} Popmsg={Popmsg} />
    </div>
  );
}

function Header({ loading }) {
  // const logo = require("./media/logo.png");

  const history = useHistory();
  const homebtn = () => {
    history.push("/");
  };
  return (
    <>
      <div className="header">
        <div>
          <div className="left">
            <img src={logo} alt="logo" onClick={homebtn} />
            Bill Box
          </div>
          <div className="right">
            <div className="loader">
              <ClipLoader color={"black"} loading={loading} size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
