import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Me from "../pages/me/Me";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/me" element={<Me />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
