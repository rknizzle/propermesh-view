import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./utils/authContext";
import { useEffect, useRef, useState } from "react";

function App() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [isStickyFooter, setIsStickyFooter] = useState(false);

  useEffect(() => {
    const contentHeight = contentRef.current.getBoundingClientRect().height;
    const viewportHeight = window.innerHeight;
    // Determine if the footer should be sticky
    // sets isStickerFooter to true if the content height is less than the viewport height, false otherwise
    setIsStickyFooter(contentHeight < viewportHeight);
  }, [location.pathname]); // Rerun this effect if the route changes

  return (
    <AuthProvider>
      <>
        <Header />
        <div ref={contentRef}>
          <Outlet />
        </div>
        <Footer sticky={isStickyFooter} />
      </>
    </AuthProvider>
  );
}

export default App;
