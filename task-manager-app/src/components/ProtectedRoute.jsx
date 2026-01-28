import React from "react";
import { checkPermissions } from "../utils/permissions";

const ProtectedRoute = ({ hasPermissions, children }) => {
  const user = JSON.parse(localStorage.getItem("authenticatedUser"));

  if (!user || !checkPermissions(user.permissions, hasPermissions)) {
    return <div>You don't have enough permissions to view this page.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;