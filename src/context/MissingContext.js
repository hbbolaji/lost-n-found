import React, { createContext, useContext, useState } from "react";

const MissingContext = createContext();
export const useMissing = () => useContext(MissingContext);

const MissingProvider = ({ children }) => {
  const [items, setItems] = useState();
  return (
    <MissingContext.Provider value={{ items }}>
      {children}
    </MissingContext.Provider>
  );
};

export default MissingProvider;
