import React from "react";
import { checkPermissions } from "../utils/permissions";

const Can = ({ currentUser, hasPermissions, children }) => {
  // Validate that currentUser is provided
  if (!currentUser || !checkPermissions(currentUser.permissions, hasPermissions)) {
    return null;
  }

  return <>{children}</>;
};

export default Can;