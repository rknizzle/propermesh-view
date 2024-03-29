import { Row, Col, Statistic, Button } from "antd";
import "./geoAnalysisBox.css";

const GeoAnalysisBox = () => {
  return (
    <div id="geo-analysis-box">
      <h2 id="geo-analysis-title">Geometry Analysis</h2>
      <Row id="geo-top-row">
        <Col span={12}>
          <div className="statistic-container">
            <Statistic title="Volume" value={117.5} />
          </div>
        </Col>
        <Col span={12}>
          <Statistic title="# of Boundary Edges" value={12} precision={0} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Statistic title="Surface Area" value={240.7} />
        </Col>
        <Col span={12}>
          <Statistic title="# of Shells" value={3} precision={0} />
          <Button
            style={{
              marginTop: 16,
            }}
            type="primary"
            id="geo-start-button"
          >
            Start
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default GeoAnalysisBox;
