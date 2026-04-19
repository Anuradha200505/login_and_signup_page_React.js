import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AddSite from "./components/AddSite";
import EditSite from "./components/EditSite"; // ✅ NEW

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* ADD SITE */}
        <Route path="/AddSite" element={<AddSite />} />

        {/* ✅ EDIT SITE (VERY IMPORTANT) */}
        <Route path="/edit-site/:siteKey" element={<EditSite />} />
      </Routes>
    </Router>
  );
}

export default App;