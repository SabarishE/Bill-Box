import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAdmin = localStorage.getItem("admin");

  var Torender = Component;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin === "false" ? (
          <Torender {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
