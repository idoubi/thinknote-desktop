import { User, Time, Text, Image, Emoji } from "./";

export interface Note {
  id: number;
  ctime: Time;
  text?: Text;
  images?: Array<Image>;
  emoji?: Emoji;
}
