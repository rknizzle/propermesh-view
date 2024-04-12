import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./utils/authContext";
import { useEffect, useRef, useState } from "react";

function App() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [isStickyFooter, setIsStickyFooter] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    //used for when you adjust the height of the window
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const contentHeight = contentRef.current.getBoundingClientRect().height;
    // 84 is the height of the footer across all screen sizes, using forwardRef caused
    // the footer to always be sticky for some reason. This is a hacky fix for now
    const workingHeight = contentHeight + headerHeight + 84;
    setIsStickyFooter(workingHeight < viewportHeight);
  }, [location.pathname, headerHeight, viewportHeight]);

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  return (
    <AuthProvider>
      <>
        <Header ref={headerRef} />
        <div ref={contentRef} style={{ marginTop: `${headerHeight}px` }}>
          <Outlet />
        </div>
        <Footer sticky={isStickyFooter} />
      </>
    </AuthProvider>
  );
}

export default App;
