// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const getToken = () => {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token;
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = userToken => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   const loginUser = async (credentials) => {
//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//       });

//       const data = await response.json();
//       setToken(data.token);
//       setIsLoggedIn(true);

//       return true;
//     } catch (error) {
//       console.error('Error logging in:', error);
//       return false;
//     }
//   };

//   const logoutUser = () => {
//     setToken(null);
//     setIsLoggedIn(false);
//   };

//   const value = {
//     isLoggedIn,
//     token,
//     setToken: saveToken, // Changed from setToken to saveToken
//     loginUser,
//     logoutUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
