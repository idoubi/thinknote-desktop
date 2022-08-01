import { invoke } from "@tauri-apps/api";
import { platform } from "./env";

export const info = (...data: any[]) => {
  if (platform === "desktop") {
    invoke("log", { msg: data[0] });
    return;
  }

  console.log(data);
};
