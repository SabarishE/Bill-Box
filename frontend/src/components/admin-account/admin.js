import { useState, useEffect } from "react";

import { UsernameBadge } from "../user-account/account.js";

export function Admin() {
  const adminname = localStorage.getItem("name");
  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");
  console.log("admin test");
  let [data, setdata] = useState([]);

  useEffect(() => {
    fetch(
      `https://money-manager-sabarish.herokuapp.com/trackers/admin/${email}`,
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
        if (data.admin) {
          setdata([...data.admin]);
          console.log("data fetched for admin");
        }
      })
      .catch((err) => {
        console.log("error in admin login >>>", err);
      });
  }, [email, token]);

  return (
    <>
      <div className="admin">
        <UsernameBadge />
        <div className="admin-header">
          <img src={require("./admin.png").default} alt="admin-logo" />
          <span>{adminname}</span>
        </div>

        <div className="admin-dashboard"></div>
        <h1>User Details</h1>
        <div className="admin-content">
          {data
            .filter((b) => b.admin === false)
            .map((v) => {
              return (
                <div key={v._id}>
                  <div className="user-block">
                    <div className="user-block-1">
                      <img src={require("./user.png").default} alt="user-img"></img>
                    </div>
                    <div className="user-block-2">
                      <span>{v.name}</span>
                      <span>{v.email}</span>
                      <span>total bills:{v.box.length}</span>
                    </div>
                  </div>
                  <div className="logs">
                    <h2>Box content</h2>
                    {v.box.length > 0
                      ? v.box
                          .sort((a, b) => {
                            return new Date(b.date) - new Date(a.date);
                          })
                          .map((b) => {
                            return (
                              <ul key={b._id}>
                                <li>{new Date(b.date).toDateString()}</li>
                                <li>{b.type}</li>
                                <li>{b.division}</li>
                                <li>{b.category}</li>
                                <li>$ {b.amount}</li>
                              </ul>
                            );
                          })
                      : "Box is empty"}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
