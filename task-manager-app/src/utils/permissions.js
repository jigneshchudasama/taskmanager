// Utility function to check permissions

export const checkPermissions = (userPermissions, requiredPermissions) => {
  const flattenedPermissions = Object.entries(userPermissions).flatMap(
    ([key, actions]) => actions.map((action) => `${key}:${action}`)
  );

  return requiredPermissions.every((permission) =>
    flattenedPermissions.includes(permission)
  );
};