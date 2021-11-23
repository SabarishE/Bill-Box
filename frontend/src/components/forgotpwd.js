import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function Forgotpwd({ setPop, setPopmsg, setLoading }) {
  const { register, handleSubmit } = useForm();

  function linkSent(msg) {
    setPop("block");
    setPopmsg(msg);
    setLoading(false);
  }

  const handler = (v, e) => {
    const baselink = window.location.origin + "/resetpwd";
    console.log({ ...v, link: baselink });
    e.target.reset();
    setLoading(true);

    // -------fetch call for forgot password

    fetch(`https://money-manager-sabarish.herokuapp.com/trackers/forgotpwd`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...v, link: baselink })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("verification link", data);
        if (data.onetimelink) {
          linkSent("verification link sent to registered mail id");
        } else {
          linkSent("Password change request failed");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("error in login >>>", err);
        linkSent("Password change request failed");
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="auth-page"
        style={{
          backgroundImage: `url(${require("../media/bgi.png").default})`
        }}
      >
        <div className="auth-page-container">
          <div className="auth-page-1">
            <img src={require("../media/authenticate/lock.png").default} alt="lock" />
            <span>Forgot Password?</span>
          </div>
          <div className="auth-page-2">
            <form onSubmit={handleSubmit(handler)}>
              <label>Enter Email</label>
              <input type="email" {...register("email")} required />
              <input type="submit" value="send" />
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button>SIGN UP</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
