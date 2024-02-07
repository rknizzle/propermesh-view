import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";

export const RootComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <RootComponent />
  </Router>
);
