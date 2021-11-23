import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

export function Signup({ setPop, setPopmsg, setLoading }) {
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  function aftersignup(msg) {
    setPop("block");
    setPopmsg(msg);
    setLoading(false);
    history.push("/login");
  }

  const handler = (v, e) => {
    console.log("sign up alert");
    e.target.reset();
    setLoading(true);

    fetch("https://money-manager-sabarish.herokuapp.com/trackers/signup", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(v)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.newuser) {
          aftersignup("Registration success!");
        } else {
          aftersignup("invalid credentials");
        }
      })
      .catch((err) => {
        aftersignup("invalid credentials");
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
            <img
              src={require("../media/authenticate/welcome.png").default}
              alt="bouquet"
            />
            <span>Welcome aboard !</span>
          </div>
          <div className="auth-page-2">
            <form onSubmit={handleSubmit(handler)}>
              <label>Enter Name</label>
              <input type="text" {...register("name")} required />
              <label>Enter Email</label>
              <input type="email" {...register("email")} required />
              <label>Enter Password</label>
              <input type="password" {...register("password")} required />
              <input type="submit" value="sign up" />
            </form>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button>Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
