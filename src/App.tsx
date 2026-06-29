import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route
            path="/learn/vocabulary"
            element={
              <ProtectedRoute>
                <Vocabulary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/grammar"
            element={
              <ProtectedRoute>
                <Grammar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/speaking"
            element={
              <ProtectedRoute>
                <Speaking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/listening"
            element={
              <ProtectedRoute>
                <Listening />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
