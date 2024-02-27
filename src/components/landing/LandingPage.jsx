import { useState, useEffect } from "react";
import "./landingPage.css";
import { Row, Col } from "antd";

export default function Landing() {
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    setAnimateLogo(true);
  }, []);

  return (
    <div className="App">
      <div id="logo-container" className={animateLogo ? "logo-animate" : ""}>
        <div className="logo-half left-half"></div>
        <div className="logo-half right-half"></div>
      </div>

      <h2 id="description">
        Software tools for automating 3D printability checks of 3D model files
      </h2>

      <img
        id="coming-soon-image"
        src="assets/coming-soon.png"
        alt="Coming Soon"
      />

      <h3 id="contact-ryan">
        Contact ryan@propermesh.com for more info and keys for beta testing
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
            Geometry Analysis is specifically designed to prepare your 3D models
            for 3D printing or manufacturing by providing a comprehensive
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
            Thickness analysis ensures durability and manufacturing
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
        <Col xs={{ span: 24 }} lg={{ span: 8 }} className="landing-prefooter">
          <p>Many supported file types such as SLDPRT, STEP, STL, OBJ, PLY</p>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 8 }}
          id="landing-middle-prefooter"
          className="landing-prefooter"
        >
          <p>Cloud File Storage</p>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 8 }}
          id="landing-end-prefooter"
          className="landing-prefooter"
        >
          <p>Easy to use REST API</p>
        </Col>
      </Row>
    </div>
  );
}
