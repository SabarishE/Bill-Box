import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

export function Login({ setPop, setPopmsg, setLoading }) {
  // ------login request------

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  function afterlogin(user) {
    setPop("block");
    setPopmsg("login success");
    setLoading(false);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("token", user.token);
    localStorage.setItem("admin", user.admin);
    if (user.admin === true) {
      return history.push("/adminaccount");
    }
    return history.push("/youraccount/dashboard");
  }
  const handler = (v, e) => {
    console.log("login alert");
    setLoading(true);

    fetch("https://money-manager-sabarish.herokuapp.com/trackers/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(v)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          afterlogin(data);
        } else {
          setPop("block");
          setPopmsg("invalid credentials");
          setLoading(false);
        }
      })
      .catch((err) => {
        setPop("block");
        setPopmsg("invalid credentials");
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
            <img
              src={require("../media/authenticate/bouquet.png").default}
              alt="bouquet"
            />
            <span>Welcome Back !</span>
          </div>
          <div className="auth-page-2">
            <form onSubmit={handleSubmit(handler)}>
              <label>
                Enter Email<sup>*</sup>
              </label>
              <input type="email" {...register("email")} required />
              <label>
                Enter Password<sup>*</sup>
              </label>
              <input type="password" {...register("password")} required />
              <input type="submit" value="log in" />
            </form>
            <div>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button>Sign up</button>
              </Link>
              <Link to="/forgotpwd" style={{ textDecoration: "none" }}>
                <button>Forgot password?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
