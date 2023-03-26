import "./App.css";
import Leftside from "./components/leftside/Leftside";
import Rightside from "./components/rightside/Rightside";

function App() {
  return (
    <div className="App">
      <div className="left">
        <Leftside />
      </div>
      <div className="right">
        <Rightside />
      </div>
    </div>
  );
}

export default App;
