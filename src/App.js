import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AddSite from "./components/AddSite"; // ✅ IMPORTANT

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* 🔥 THIS WAS MISSING */}
        <Route path="/AddSite" element={<AddSite />} />
      </Routes>
    </Router>
  );
}

export default App;