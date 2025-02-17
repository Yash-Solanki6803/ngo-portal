import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import {
  About,
  Campaigns,
  CreateCampaign,
  CreateNgo,
  Dashboard,
  DashboardLayout,
  Home,
  HomeLayout,
  Login,
  Ngos,
  NoPage,
  Register,
  SingleCampaign,
  UpdateNgo,
  Users,
} from "@/pages";
const App: React.FC = () => {
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
            <Route path="ngos" element={<Ngos />} />
            <Route path="update-ngo" element={<UpdateNgo />} />
            <Route path="create-ngo" element={<CreateNgo />} />

            <Route path="campaigns">
              <Route index element={<Campaigns />} />
              <Route path="create" element={<CreateCampaign />} />
              <Route path=":id" element={<SingleCampaign />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
