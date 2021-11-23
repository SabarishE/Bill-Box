import { Route, Redirect } from "react-router-dom";

export const ProtectedRouteA = ({ component: Component, ...rest }) => {
  const isAdmin = localStorage.getItem("admin");
  var Torender = Component;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin === "true" ? <Torender {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
