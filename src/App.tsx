import Input from "./components/Input";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import "./App.css";

import { NoteContextProvider } from "./context/NoteContext";

export default () => {
  return (
    <div className="App">
      <NoteContextProvider>
        <Input />
        <Notes />
        <Footer />
      </NoteContextProvider>
    </div>
  );
};
