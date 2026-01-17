import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VoteList from "./pages/VoteList";
import AdminManage from "./pages/AdminManage";
import VoteCount from "./pages/VoteCount";

import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/vote"
          element={
            <ProtectedRoute>
              <VoteList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute>
              <AdminManage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/count"
          element={
            <ProtectedRoute>
              <VoteCount />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
