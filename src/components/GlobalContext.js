import { createContext, useState } from "react";
const initialState = {
  email: null,
  password: null,
  isLogin: false,
};
export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [login, setLogin] = useState(initialState);

  const setUser = (email, password) => {
    console.log(email, password);
    setLogin((pre) => {
      return {
        ...pre,
        email: email,
        password: password,
        isLogin: true,
      };
    });
  };
  return (
    <GlobalContext.Provider value={{ login, setUser, isLogin: login.isLogin }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
