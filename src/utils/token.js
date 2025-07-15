export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    console.error('Token parsing error:', e);
    return true;
  }
};
