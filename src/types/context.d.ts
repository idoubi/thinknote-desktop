import { ReactNode } from "react";

export interface ContextProviderValue {
  [propName: string]: any;
}

export interface ContextProviderProps {
  children: ReactNode;
}

export interface Env {
  platform: string;
  appName: string;
  apiBaseUri: string;
}
