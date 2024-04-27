import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./utils/authContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage.jsx";
import AnalysisPage from "./components/AnalysisPage/AnalysisPage.jsx";
import LoginPage from "./components/loginRegister/LoginPage/LoginPage.jsx";
import RegisterPage from "./components/loginRegister/RegisterPage/RegisterPage.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import AlreadyLoggedInRedirect from "./utils/AlreadyLoggedInRedirect.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route
            path="login"
            element={<AlreadyLoggedInRedirect component={LoginPage} />}
          />
          <Route
            path="register"
            element={<AlreadyLoggedInRedirect component={RegisterPage} />}
          />
          <Route
            path="analysis"
            element={<ProtectedRoute component={AnalysisPage} />}
          />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);
