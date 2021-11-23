import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export function Useraccount() {
  return (
    <>
      <UserAccountHeader />
    </>
  );
}

export function UserAccountHeader() {
  return (
    <>
      <div className="nav-bar">
        <Link to="/youraccount/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/youraccount/add">
          <button>New entry</button>
        </Link>
        <Link to="/youraccount/filters">
          <button>Filters</button>
        </Link>
        <Link to="/youraccount/history">
          <button>Your Box</button>
        </Link>
        <Link to="/youraccount/update">
          <button>Update</button>
        </Link>
      </div>
    </>
  );
}

export function UsernameBadge() {
  const history = useHistory();
  const [name, setname] = useState("");

  function logoutHandler() {
    console.log("log out alert");

    let removables = ["name", "email", "token", "admin"];

    removables.forEach((v) => localStorage.removeItem(v));

    history.push("/login");
  }

  function badgeClick() {
    let admin = localStorage.getItem("admin");

    if (admin === "true") {
      history.push("/adminaccount");
    } else {
      history.push("/youraccount/dashboard");
    }
  }

  useEffect(() => {
    const currentuser = localStorage.getItem("name");
    setname(currentuser);
  }, []);

  return (
    <>
      {name ? (
        <div className="user-badge">
          <span>
            <img
              alt="pro"
              src={require("./profilepic.png").default}
              onClick={badgeClick}
            ></img>
            <span>{name}</span>
          </span>
          <span>
            <button onClick={logoutHandler}>log out</button>
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
