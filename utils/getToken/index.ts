export const getToken = (
  authorization: string | undefined
): string | undefined => authorization?.replace('Bearer ', '');
