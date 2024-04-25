import "./landingPage.css";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  function navigateToAnalysPageBasedOnLoginStatus() {
    if (isLoggedIn) {
      navigate("/analysis")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="App">
      <Row
        className="intro-container"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col lg={12} className="intro-generic-img-container"></Col>
        <Col lg={12} className="intro-description-container">
          <h2 id="description">
            Advanced 3D Analysis for Manufacturing Perfect Parts
          </h2>
          <div id="description-2">
            We provide powerful software tools for analyzing 3D models and
            extracting critical data to ensure that they will be correctly
            manufactured with no issues. Gain insights and find issues before
            it&apos;s too late.
          </div>
          <div id="description-list">
            <ul>
              <li>
                Many mesh and CAD file types supported such as stl, obj, ply,
                STEP, SLDPRT and more
              </li>
              <br />
              <li>
                We offer an analysis API for automating workflows and allowing
                integration into your own site
              </li>
            </ul>
          </div>
          <Button
            type="primary"
            id="analysis-page-btn"
            size="large"
            onClick={navigateToAnalysPageBasedOnLoginStatus}
          >
            Analyze Parts
          </Button>
        </Col>
      </Row>

      <h3 id="contact-ryan">
        Contact ryan@propermesh.com for more info and requests for API keys
      </h3>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 8, offset: 3 }}
          id="geo-analysis"
        >
          <h2>Geometry Analysis</h2>
          <p>
            Our Geometry Analysis is specifically designed to prepare your 3D
            models for 3D printing or manufacturing by providing a comprehensive
            examination of their structure and integrity.
          </p>
          <ul>
            <li>Surface Area</li>
            <li>Volume</li>
            <li>Bounding Box</li>
            <br />
            <li>Boundary Edges</li>
            <li>Number of shells</li>
          </ul>
          <br />
          <br />
          <div className="use-cases">Use Cases:</div>
          <ul>
            <li>Useful in 3D printing for ensuring model integrity.</li>
            <li>
              Effective for generating manufacturing quotes based on model
              dimensions.
            </li>
            <li>
              Ideal for designers and engineers in pre-production stages to
              validate 3D models.
            </li>
          </ul>
        </Col>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 8, offset: 2 }}
          id="thick-analysis"
        >
          <h2>Thickness Analysis</h2>
          <p>
            Our Thickness Analysis ensures durability and manufacturing
            compatibility. This tool focuses on evaluating and highlighting
            areas of your model that may be too thin for successful production.
          </p>
          <ul>
            <li>
              Detects thin areas of model and calculates total and percentage of
              thin surface area
            </li>
            <li>
              Generates a colored 3D model to easily visualize thin areas of the
              model
            </li>
          </ul>
          <br />
          <br />
          <div className="use-cases">Use Cases:</div>
          <ul>
            <li>
              Essential for 3D printing professionals to preemptively identify
              and correct potential printing issues.
            </li>
            <li>
              Useful in product design for ensuring structural integrity and
              material efficiency.
            </li>
          </ul>
        </Col>
      </Row>
      <Row id="landing-prefooter" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 9, offset: 3 }}
          id="landing-start-prefooter"
          className="landing-prefooter"
        >
          <h2>API for Efficient 3D Printing</h2>
          <p>
            Elevate your platform with our cutting-edge software, designed to
            ensure 3D models are print-ready. Our API allows for easy
            integration, enabling automated, real-time 3D model checks directly
            on your website. This not only streamlines the validation process
            but also enhances user experience and efficiency in 3D printing
            projects. Discover how our technology can revolutionize your
            platform; for more information or to get started, contact us at
            ryan@propermesh.com. Transform your 3D printing workflow today.
          </p>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 9 }}
          id="landing-end-prefooter"
          className="landing-prefooter"
        >
          <img id="impeller-image" src="/assets/impeller.png" alt="impeller" />
        </Col>
      </Row>
    </div>
  );
}
