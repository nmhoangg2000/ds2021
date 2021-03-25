const setSession = (username) => {
  sessionStorage.setItem("username", username);
};

const getSession = () => {
  let id = sessionStorage.getItem("username");
  if (id == null) return false;
  return id;
};

export { setSession, getSession };
