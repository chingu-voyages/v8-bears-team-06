export const authenticated = next => (root, args, context, info) => {
  if (!context.user.loggedIn) {
    throw new Error(`Unauthenticated!`);
  }

  return next(root, args, context, info);
};
