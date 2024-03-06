import "./landingPage.css";
import { Row, Col, Button } from "antd";

export default function Landing() {
  return (
    <div className="App">
      <Row
        className="intro-container"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col lg={12} className="intro-generic-img-container"></Col>
        <Col lg={12} className="intro-description-container">
          <h2 id="description">
            Software tools for automating 3D printability checks of 3D model
            files
          </h2>
          <div id="description-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            mollitia assumenda fugiat nihil voluptatibus exercitationem unde
            natus! Odit delectus vero vitae a animi, laudantium perferendis quod
            nihil, ex non at!
          </div>
          <div id="description-list">
            <ul>
              <li>information information</li>
              <li>some more information but a little longer</li>
              <li>important stuff that someone should know</li>
            </ul>
          </div>
          <Button type="primary" id="analysis-page-btn" size="large">
            Analysis Page
          </Button>
        </Col>
      </Row>

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
        <Col
          xs={{ span: 24 }}
          lg={{ span: 9, offset: 3 }}
          id="landing-start-prefooter"
          className="landing-prefooter"
        >
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit, vel
            repellat provident et iusto obcaecati voluptatum nostrum architecto
            quis. Nobis in perferendis rem accusantium ipsa blanditiis
            consectetur inventore dignissimos unde? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Omnis in pariatur neque esse dolor
            dignissimos maxime natus ex. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ad alias dicta ullam sapiente deserunt illo.
            Consectetur sequi cum ad.
          </p>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 9 }}
          id="landing-end-prefooter"
          className="landing-prefooter"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita et
            obcaecati deserunt tenetur sint autem quos temporibus eius animi
            mollitia est culpa ratione explicabo nostrum velit natus laudantium,
            excepturi ab!
          </p>
        </Col>
      </Row>
    </div>
  );
}
