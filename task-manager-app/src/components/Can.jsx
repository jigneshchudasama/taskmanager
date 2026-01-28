import React from "react";
import { checkPermissions } from "../utils/permissions";

const Can = ({ hasPermissions, children }) => {
  const user = JSON.parse(localStorage.getItem("authenticatedUser"));

  if (!user || !checkPermissions(user.permissions, hasPermissions)) {
    return null;
  }

  return <>{children}</>;
};

export default Can;