import React from "react";
import { checkPermissions } from "../utils/permissions";

const ProtectedRoute = ({ currentUser, hasPermissions, children }) => {
  // Validate that currentUser is provided
  if (!currentUser) {
    return <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">Authentication required. Please log in.</div>;
  }

  // Check if user has required permissions
  if (!checkPermissions(currentUser.permissions, hasPermissions)) {
    return <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">You don't have enough permissions to view this page.</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;