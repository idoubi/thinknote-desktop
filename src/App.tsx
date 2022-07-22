import Input from "./components/Input";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import "./App.css";

export default () => {
  return (
    <div className="App">
      <Input />
      <Notes />
      <Footer />
    </div>
  );
};
