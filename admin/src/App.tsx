import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="font-outfit">
      <Navbar />
      <Routes>
        <Route />
      </Routes>
    </div>
  );
};

export default App;
