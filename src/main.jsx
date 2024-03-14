import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage.jsx";
import AnalysisPage from "./components/AnalysisPage/AnalysisPage.jsx";
import LoginPage from "./components/loginRegister/LoginPage/LoginPage.jsx";
import RegisterPage from "./components/loginRegister/RegisterPage/RegisterPage.jsx";

export const RootComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
      </Route>
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <RootComponent />
  </Router>
);
