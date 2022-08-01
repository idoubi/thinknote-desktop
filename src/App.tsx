import { useContext, useEffect } from "react";
import { NoteContext } from "./context/NoteContext";
import { Dialog, Topbar, Notes, Input, Login } from "./components";
import "./App.less";

export default () => {
  const { user } = useContext(NoteContext);

  return (
    <>
      <Dialog />
      <div className="app">
        <header>
          <Topbar />
        </header>
        {user.id ? (
          <>
            <main>
              <Notes />
            </main>
            <footer>
              <Input />
            </footer>
          </>
        ) : (
          <main>
            <Login />
          </main>
        )}
      </div>
    </>
  );
};
