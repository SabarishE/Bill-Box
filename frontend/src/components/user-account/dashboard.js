import { useHistory } from "react-router-dom";
import { UserAccountHeader } from "./account.js";
import { UsernameBadge } from "./account.js";

import { useState } from "react";

export function Dashboard() {
  let history = useHistory();
  const currentuser = localStorage.getItem("name");
  const currentemail = localStorage.getItem("email");

  const [Popover, setPopover] = useState("none");

  return (
    <>
      <div
        className="account-page"
        style={{
          backgroundImage: `url(${require("../../media/bgi.png").default})`
        }}
      >
        <UserAccountHeader />
        <UsernameBadge />
        <h1 className="welcome-user">
          Welcome {currentuser ? currentuser : "Current User"} !
        </h1>
        <h3>( {currentemail} )</h3>

        <div className="Dashboard">
          <button
            onClick={() => {
              setPopover("block");
            }}
          >
            ADD
          </button>
        </div>

        <div className="popover" style={{ display: Popover }}>
          <button
            onClick={() => {
              setPopover("none");
              localStorage.setItem("type", "Income");
              history.push("/youraccount/add");
            }}
          >
            INCOME
          </button>
          <button
            onClick={() => {
              setPopover("none");
              localStorage.setItem("type", "Expense");
              history.push("/youraccount/add");
            }}
          >
            EXPENSE
          </button>
        </div>
      </div>
    </>
  );
}
