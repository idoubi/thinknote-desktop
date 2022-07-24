import { Dialog, Topbar, Notes, Input } from "./components";
import { NoteContextProvider } from "./context/NoteContext";
import "./App.less";

export default () => {
  return (
    <NoteContextProvider>
      <Dialog />
      <div className="app">
        <header>
          <Topbar />
        </header>
        <main>
          <Notes />
        </main>
        <footer>
          <Input />
        </footer>
      </div>
    </NoteContextProvider>
  );
};
