import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/landing/LandingPage.jsx";
import AppPage from "./components/AppPage.jsx";
import Login from "./components/loginRegister/Login.jsx";
import Register from "./components/loginRegister/Register.jsx";

export const RootComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="apppage" element={<AppPage />} />
      </Route>
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <RootComponent />
  </Router>
);
