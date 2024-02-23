import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isStickyFooterPage =
    location.pathname === "/loginregister" || location.pathname === "/apppage";
  return (
    <>
      <Header />
      <Outlet />
      <Footer sticky={isStickyFooterPage} />
    </>
  );
}

export default App;
