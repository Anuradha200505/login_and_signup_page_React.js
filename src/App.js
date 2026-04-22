// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./components/Login";

// Layout Components
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Main Pages
import OutletList from "./components/OutletList";
import CreateOutlet from "./components/CreateOutlet";
import UpdateOutlet from "./components/UpdateOutlet";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 LOGIN */}
        <Route path="/" element={<Login />} />

        {/* 🏠 HOME → Outlet List */}
        <Route
          path="/home"
          element={
            <Layout>
              <OutletList />
            </Layout>
          }
        />

        {/* ➕ CREATE OUTLET */}
        <Route
          path="/create"
          element={
            <Layout>
              <CreateOutlet />
            </Layout>
          }
        />

        {/* ✏️ UPDATE OUTLET */}
        <Route
          path="/update/:siteKey"
          element={
            <Layout>
              <UpdateOutlet />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;