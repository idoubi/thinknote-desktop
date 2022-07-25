export interface Time {
  timestamp: number;
  text: string;
}

export interface Text {
  content: string;
}

export interface Image {
  url: string;
}

export interface Location {
  text: string;
}

export interface Emoji {
  text: string;
  icon?: JSX.Element;
}

export interface Note {
  id: number;
  ctime: Time;
  text?: Text;
  images?: Array<Image>;
  emoji?: Emoji;
}

export interface NoteProps {
  note: Note;
}

export interface User {
  id: number;
  nickname?: string;
  avatar_url?: string;
}
