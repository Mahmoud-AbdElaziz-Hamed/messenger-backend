export const getToken = (authorization) =>
  authorization?.replace("Bearer ", "");
