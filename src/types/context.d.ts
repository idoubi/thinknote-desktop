import { ReactNode } from "react";
import { Note } from "./";

export interface NoteContextValue {
  [propName: string]: any;
}

export interface ContextProviderProps {
  children: ReactNode;
}
