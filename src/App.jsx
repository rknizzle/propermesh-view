import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLoginRegisterPage = location.pathname === "/loginregister";
  return (
    <>
      <Header />
      <Outlet />
      <Footer sticky={isLoginRegisterPage} />
    </>
  );
}

export default App;
