import { createContext, useEffect, useRef, useState } from "react";
import { ContextProviderProps, ContextProviderValue } from "../types/context";
import { getUserProfile } from "../apis/note";
import { Note, User } from "../types/note";
import { Notes } from "../types/api";
import { getNotes } from "../apis/note";
import { transferNotesFromApi } from "../utils/transfer";

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
      if (data.avatar_url === "") {
        data.avatar_url = "/logo.png";
      }
      // 用于已登录
      setUser(data);
    }
  };

  // fetch notes
  const fetchNotes = async (lastId: number) => {
    const { code, message, data } = await getNotes({ lastId });
    console.log("fetch notes:", lastId, code, message, data);
    if (code === 0 && data) {
      const newNotes = transferNotesFromApi(data as Notes);

      setNotes(newNotes.reverse());
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
        setUser,
        checkLogin,
        notes,
        setNotes,
        fetchNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
