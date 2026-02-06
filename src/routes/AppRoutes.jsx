import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/landingPage";
import ParentDash from "../pages/parentDash";
import ChildDash from "../pages/childDash";
import ExpertDash from "../pages/expertDash";
import AdminDash from "../pages/adminDash";

function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC LANDING */}
      <Route path="/" element={<LandingPage />} />

      {/* DASHBOARDS */}
      <Route path="/parent" element={<ParentDash />} />
      <Route path="/child" element={<ChildDash />} />
      <Route path="/expert" element={<ExpertDash />} />
      <Route path="/admin" element={<AdminDash />} />

    </Routes>
  );
}

export default AppRoutes;
