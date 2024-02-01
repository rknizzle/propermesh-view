import "./landingPage.css";
import { Row, Col } from "antd";

export default function Landing() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>P R O P E R M E S H</h1>
      </header> */}

      <img src="assets/logo.png" alt="" id="logo" />

      <h2>
        Software tools for automating 3D printability checks of 3D model files
      </h2>

      <h3>Coming Soon!</h3>

      <h3>
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
            Geometry analysis performs detailed geometry analysis on 3D model
            files. It is designed to efficiently calculate key dimensions and
            identify potential issues within the 3D mesh.
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
            <li>
              Ideal for designers and engineers in pre-production stages to
              validate 3D models.
            </li>
            <li> Useful in 3D printing for ensuring model integrity.</li>
            <li>
              Helps in digital archiving of 3D artifacts by providing detailed
              dimensional data.
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
            TODO: Geometry analysis performs detailed geometry analysis on 3D
            model files. It is designed to efficiently calculate key dimensions
            and identify potential issues within the 3D mesh.
          </p>
          <ul>
            <li>Percentage of thin surface area</li>
          </ul>
          <br />
          <br />
          <div className="use-cases">Use Cases:</div>
          <ul>
            <li>
              Essential for 3D printing enthusiasts and professionals to
              preemptively identify and correct potential printing issues.
            </li>
            <li>
              Useful in product design for ensuring structural integrity and
              material efficiency.
            </li>
            <li>
              Assists in educational settings for teaching the principles of 3D
              modeling and printing
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}
