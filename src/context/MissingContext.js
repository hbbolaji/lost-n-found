import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { db, storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MissingContext = createContext();
export const useMissing = () => useContext(MissingContext);

const MissingProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [items, setItems] = useState([]);
  const [dashItems, setDashItems] = useState([]);

  const getMissing = () => {
    const q = query(collection(db, "missings"));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setItems(data);
    });
  };

  const getDashItems = (email) => {
    const q = query(
      collection(db, "missings"),
      where("founderEmail", "==", email)
    );
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setDashItems(data);
    });
  };

  const addMissingItem = async (item) => {
    try {
      await setDoc(doc(db, "missings", item.id), item);
    } catch (error) {
      console.log(error);
    }
  };

  const setAsFound = async (missing) => {
    try {
      const submissionRef = doc(db, "missings", missing.id);
      await updateDoc(submissionRef, missing);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  const uploadCoverImage = (file) => {
    const storageRef = ref(storage, `/missing/image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          console.log(url);
        });
      }
    );
  };

  const createFeedback = async (item) => {
    try {
      await setDoc(doc(db, "feedbacks", item.id), item);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeedbacks = () => {
    const q = query(collection(db, "feedbacks"));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setFeedbacks(data);
    });
  };

  return (
    <MissingContext.Provider
      value={{
        items,
        dashItems,
        imageUrl,
        feedbacks,
        getMissing,
        addMissingItem,
        uploadCoverImage,
        progress,
        getDashItems,
        setAsFound,
        createFeedback,
        getFeedbacks,
      }}
    >
      {children}
    </MissingContext.Provider>
  );
};

export default MissingProvider;
