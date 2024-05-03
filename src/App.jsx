import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useStartPageAtTop from "./utils/startPageAtTop";

function App() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [isStickyFooter, setIsStickyFooter] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  // 85 is the height of the footer across all screen sizes
  // If this value changes, then update the height of .footer-container in footer.css
  const FOOTER_HEIGHT = 85;

  // Ensures that we start at the top of the page when the route changes
  // instead of staying at the same scroll position
  useStartPageAtTop();

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
    const workingHeight = contentHeight + headerHeight + FOOTER_HEIGHT;
    setIsStickyFooter(workingHeight < viewportHeight);
  }, [location.pathname, headerHeight, viewportHeight]);

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <div ref={contentRef} style={{ marginTop: `${headerHeight}px` }}>
        <Outlet />
      </div>
      <Footer sticky={isStickyFooter} />
    </>
  );
}

export default App;
