
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token && token !== "undefined" && token !== "null";
};
