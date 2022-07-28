import { createContext, useEffect, useRef, useState } from "react";
import { ContextProviderProps, ContextProviderValue } from "../types/context";
import { getUserProfile } from "../apis/note";
import { Note, User } from "../types/note";

export const NoteContext = createContext({} as ContextProviderValue);

export const NoteContextProvider = ({ children }: ContextProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [notes, setNotes] = useState([] as Note[]);
  const [user, setUser] = useState({} as User);

  const showDialog = (text: string) => {
    setDialogText(text);
    setIsDialogOpen(true);
  };

  const hideDialog = () => {
    setIsDialogOpen(false);
    setDialogText("");
  };

  // 检测登录
  const checkLogin = async () => {
    const { code, message, data } = await getUserProfile();
    console.log("check login", code, message, data);
    if (data && data.id) {
      // 用于已登录
      setUser(data);
    }
  };

  // check login at the first time
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        isDialogOpen,
        dialogText,
        showDialog,
        hideDialog,
        user,
        checkLogin,
        notes,
        setNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
