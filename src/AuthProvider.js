import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Để current user không bị null
    });
    return unsubscribe;
  }, []);

  const signup = (username, email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username });
        console.log("updated user", result.user);
      })
      .catch((error) => {
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const value = { currentUser, signup };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
