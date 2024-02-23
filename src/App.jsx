import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "../utils/authContext";

function App() {
  const location = useLocation();
  const isStickyFooterPage =
    location.pathname === "/loginregister" || location.pathname === "/apppage";
  return (
    <AuthProvider>
      <>
        <Header />
        <Outlet />
        <Footer sticky={isStickyFooterPage} />
      </>
    </AuthProvider>
  );
}

export default App;
