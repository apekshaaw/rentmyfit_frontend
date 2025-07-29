// utils/getUser.js
export const getUser = () => {
  try {
    const raw = localStorage.getItem('user');
    if (raw && raw !== 'undefined') {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Invalid user JSON in localStorage:', err);
  }
  return null;
};
