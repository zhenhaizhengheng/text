import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Vocabulary from "@/pages/Vocabulary";
import Grammar from "@/pages/Grammar";
import Speaking from "@/pages/Speaking";
import Listening from "@/pages/Listening";
import Progress from "@/pages/Progress";
import Achievements from "@/pages/Achievements";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/learn/vocabulary" element={<Vocabulary />} />
          <Route path="/learn/grammar" element={<Grammar />} />
          <Route path="/learn/speaking" element={<Speaking />} />
          <Route path="/learn/listening" element={<Listening />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
