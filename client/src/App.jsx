import { BrowserRouter, Routes, Route } from "react-router";
import {
  DashboardLayout,
  HomeLayout,
  About,
  Home,
  NoPage,
  Login,
  Register,
  Dashboard,
  Users,
} from "./pages";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
