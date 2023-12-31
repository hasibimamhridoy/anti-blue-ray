import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/FirebaseConfig/firebaseConfig";

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGoogleRegister = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const handleManualLogin = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const handleManualLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);


  const [isAdmin, setIsAdmin] = useState({});

  useEffect(() => {
    fetchData();
  }, [user]);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://anti-blue-ray-server.vercel.app/isAdmin/${user?.email}`
      );
      const data = await response.json();
      console.log(data);
      setIsAdmin(data.admin);
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  }

console.log(isAdmin);
console.log(user);

  const authInfo = {
    user,
    loading,
    handleGoogleRegister,
    handleManualLogin,
    handleManualLogout,
    isAdmin
  };




  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
