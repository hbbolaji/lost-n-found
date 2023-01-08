import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
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

  const checkAdmin = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setLoggedInUser(data[0]);
    });
  };

  const logout = async () => {
    try {
      signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = () => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setUsers(data);
    });
  };

  const updateUser = async (user) => {
    try {
      const studentRef = doc(db, "users", user.id);
      await updateDoc(studentRef, user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (user) => {
    await deleteDoc(doc(db, "users", user.id));
  };

  const getUserInfo = (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setUserInfo(data[0]);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        userInfo,
        loggedInUser,
        user,
        signupWithEmail,
        signinWithEmail,
        logout,
        createUser,
        checkAdmin,
        getUsers,
        deleteUser,
        updateUser,
        getUserInfo,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
