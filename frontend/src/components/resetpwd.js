import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { useState } from "react";

export function Resetpwd({ setPop, setPopmsg, setLoading }) {
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const [verified, setverified] = useState(false);

  var urlarr = window.location.href.split("/");
  const email = urlarr[urlarr.length - 2];
  const token = urlarr[urlarr.length - 1];

  // ---------fetch call to verify reset link-----
  function afterverification(msg) {
    setPop("block");
    setPopmsg(msg);
    setLoading(false);
  }

  function Verify() {
    setLoading(true);
    fetch(
      `https://money-manager-sabarish.herokuapp.com/trackers/resetpwd/${email}/${token}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "Request Accepted") {
          setverified(true);
          afterverification("Verification success, Reset your passoword");
        } else {
          afterverification("Verification failed");
        }
      })
      .catch((err) => {
        console.log("error in login >>>", err);
        afterverification("Verification failed");
      });
  }

  function afterReset(msg) {
    setPop("block");
    setPopmsg(msg);
    setLoading(false);
  }

  const resetPassword = (v, e) => {
    console.log(v);
    e.target.reset();
    setLoading(true);

    if (v.pwd === v.confirmpwd) {
      fetch(
        `https://money-manager-sabarish.herokuapp.com/trackers/resetpwd/${email}/${token}`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ pwd: v.pwd })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.msg === "Password Changed Successfully") {
            afterReset("Password changed successfully !!!");
            history.push("/login");
          } else {
            afterReset("Error in password change");
          }
        })
        .catch((err) => {
          console.log("error in login >>>", err);
          afterReset("Error in password change");
        });
    } else {
      afterReset("Passwords didn't match");
    }
  };

  // ----------fetch call to reset password------

  return (
    <>
      <div
        className="auth-page"
        style={{
          backgroundImage: `url(${require("../media/bgi.png").default})`
        }}
      >
        {verified === true ? (
          ""
        ) : (
          <button className="verify-btn" onClick={Verify}>
            Verify
          </button>
        )}
        {verified === true ? (
          <>
            <div className="auth-page-container">
              <div className="auth-page-1">
                <img
                  src={require("../media/authenticate/resetlock.png").default}
                  alt="lock"
                />
                <span>Reset password</span>
              </div>
              <div className="auth-page-2">
                <form onSubmit={handleSubmit(resetPassword)}>
                  <label>Enter Password</label>
                  <input type="password" {...register("pwd")} required />
                  <label>Re-enter Password</label>
                  <input type="password" {...register("confirmpwd")} required />
                  <input type="submit" value="reset" />
                </form>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
