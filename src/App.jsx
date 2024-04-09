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
  const footerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const contentHeight = contentRef.current.getBoundingClientRect().height;
    const viewportHeight = window.innerHeight;
    // Determine if the footer should be sticky
    // sets isStickerFooter to true if the content height is less than the viewport height, false otherwise
    setIsStickyFooter(contentHeight < viewportHeight);
  }, [location.pathname]); // Rerun this effect if the route changes

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
    setFooterHeight(footerRef.current.offsetHeight);
  }, []);

  return (
    <AuthProvider>
      <>
        <Header ref={headerRef} />
        <div
          ref={contentRef}
          style={{
            marginTop: `${headerHeight + 10}px`,
            marginBottom: `${footerHeight + 10}px`,
          }}
        >
          <Outlet />
        </div>
        <Footer ref={footerRef} sticky={isStickyFooter} />
      </>
    </AuthProvider>
  );
}

export default App;
