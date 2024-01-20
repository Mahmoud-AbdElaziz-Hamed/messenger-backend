export const getToken = (req) =>
  req.headers.authorization?.replace("Bearer ", "");
