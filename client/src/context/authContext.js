// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = async (inputs) => {
//     const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
//       withCredentials: true,
//     });

//     setCurrentUser(res.data)
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const storedUser = localStorage.getItem("user");
//   const [currentUser, setCurrentUser] = useState(
//     storedUser ? JSON.parse(storedUser) : null
//   );

//   const login = async (inputs) => {
//     const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
//       withCredentials: true,
//     });

//     setCurrentUser(res.data);
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
