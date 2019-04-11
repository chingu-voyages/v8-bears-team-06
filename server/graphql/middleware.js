export const authenticated = next => (root, args, context, info) => {
  if (!context.user.isLoggedIn) {
    throw new Error(`Unauthenticated!`);
  }

  return next(root, args, context, info);
};
