import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./utils/authContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage.jsx";
import AnalysisPage from "./components/AnalysisPage/AnalysisPage.jsx";
import LoginPage from "./components/loginRegister/LoginPage/LoginPage.jsx";
import RegisterPage from "./components/loginRegister/RegisterPage/RegisterPage.jsx";
import APIInfoPage from "./components/APIInfo/APIInfoPage.jsx";
import APIExamplesPage from "./components/APIInfo/APIExamplesPage.jsx";
import APIKeyRequestPage from "./components/APIInfo/APIKeyRequestPage.jsx";
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
          <Route
            path="info/api"
            element={APIInfoPage}
          />
          <Route
            path="info/api/examples"
            element={APIExamplesPage}
          />
          <Route
            path="info/api/request"
            element={APIKeyRequestPage}
          />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);
