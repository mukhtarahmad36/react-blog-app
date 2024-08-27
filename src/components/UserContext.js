import { createContext, useState, useEffect } from "react";

const initialState = {
  email: null,
  password: null,
  isLogin: false,
};
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(initialState);

  const setUser = (email, password) => {
    console.log(email, password);
    // setLogin((pre) => {
    //   return {
    //     ...pre,
    //     email: email,
    //     password: password,
    //     isLogin: true,
    //   };
    // });
  };

  //   useEffect(() => {
  //     console.log(login);
  //   }, [login]);

  return (
    <>
      <UserContext.Provider
        value={{
          login,
          setLogin,
          setUser,
          isLogin: login.isLogin,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
