import React, { createContext, useState } from "react";
import useNotes from "../hooks/useNotes";
import { ContextProviderProps, NoteContextValue, Note } from "../types";

export const NoteContext = createContext({} as NoteContextValue);

export const NoteContextProvider = ({ children }: ContextProviderProps) => {
  const [lastId, setLastId] = useState(0);
  const notes = useNotes(lastId);

  return (
    <NoteContext.Provider
      value={{
        lastId,
        notes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
