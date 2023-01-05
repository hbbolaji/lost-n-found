import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else setUser(null);
      setLoading(false);
    });
  }, []);
  const [user, setUser] = useState(null);
  const signupWithEmail = async (payload) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      const user = userCredential.user;
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async (item) => {
    try {
      await setDoc(doc(db, "users", item.id), item);
    } catch (error) {
      console.log(error);
    }
  };
  const signinWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, signupWithEmail, signinWithEmail, logout, createUser }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
