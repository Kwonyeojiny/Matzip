import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/common/Layout";
import Matzip from "./pages/Matzip";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Matzip />} />
      </Route>
    </Routes>
  );
}

export default App;
