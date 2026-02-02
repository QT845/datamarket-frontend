import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/auth/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Me from "@/pages/me/Me";
import CreateDatasetPage from "@/features/dataset/pages/CreateDatasetPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/me" element={<Me />} />
      </Route>

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/datasets/create" element={<CreateDatasetPage />} />
      </Route>
      
    </Routes>
  );
}
