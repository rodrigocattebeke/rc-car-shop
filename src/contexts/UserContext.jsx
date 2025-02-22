import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const nullUserState = {
  isLogged: false,
  user: null,
  name: null,
  email: null,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(nullUserState);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  //if localstorage has users data, set to state;
  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));
    const usersBD = JSON.parse(localStorage.getItem("usersBD"));

    if (userLogged) setUser(userLogged);
    if (usersBD) setUsers(usersBD);
  }, []);

  const verifyUser = (userObj) => {
    const existUserIndex = users.findIndex((user) => user.user == userObj.user && user.password == userObj.password);
    return existUserIndex !== -1 ? { exist: true, userData: users[existUserIndex] } : { exist: false };
  };

  const verifyUserName = (user) => {
    const isRegistered = users.find((data) => data.user == user);
    return isRegistered;
  };

  const setLoggedUser = (userObj) => {
    const { user, name, email } = userObj;
    sessionStorage.setItem("userLogged", JSON.stringify({ user, name, email }));

    setUser({
      isLogged: true,
      user,
      name,
      email,
    });
  };

  const logOutUser = () => {
    setUser(nullUserState);
    sessionStorage.removeItem("userLogged");
  };

  const register = (userObj) => {
    try {
      if (verifyUserName(userObj.user)) {
        throw new Error("El usuario ya existe");
      }
      setLoggedUser({ user: userObj.user, name: userObj.name, email: userObj.email });
      setUsers([...users, userObj]);
      localStorage.setItem("usersBD", JSON.stringify([...users, userObj]));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logIn = (userObj) => {
    const res = verifyUser(userObj);
    if (!res.exist) return { logged: false, message: "El usuario o contraseña son incorrectos" };

    setLoggedUser(res.userData);

    return { logged: true };
  };

  const logOut = () => {
    logOutUser();
    navigate("/");
  };

  return <UserContext.Provider value={{ user, logIn, logOut, register }}>{children}</UserContext.Provider>;
};

export { UserContext };
