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
