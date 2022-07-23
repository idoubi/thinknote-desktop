import { ReactNode } from "react";
import { Note } from "./";

export interface ContextProviderValue {
  [propName: string]: any;
}

export interface ContextProviderProps {
  children: ReactNode;
}
