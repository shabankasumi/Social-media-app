import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/feed";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomBar from "./components/BottomBar";
import CreatePost from "./pages/CreatePost";
import { ForgotPassword } from "./pages/forgot-password";
import { Resetpassword } from "./pages/Resetpassword";

function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />

        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
      <BottomBar />
    </>
  );
}

export default App;