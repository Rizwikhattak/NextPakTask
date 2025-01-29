import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing Page/LandingPage";
import LoginPage from "./Components/Authentication/LoginPage";
import SignUpPage from "./Components/Authentication/SignUpPage";
import MainPage from "./Components/Main App Page/MainPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Sidebar from "./Sidebar";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
