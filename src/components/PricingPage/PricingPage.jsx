import { Card, Button, Row, Col } from 'antd';
import "antd/dist/reset.css";

export default function PricingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '40px' }}>
      <Row gutter={[16, 16]} justify="center">
        {/* Free Plan */}
        <Col xs={24} md={12} lg={6}>
          <Card title="Free Plan" bordered={false} style={{ background: '#111', color: 'white' }}>
            <h2>$0/month</h2>
            <Button type="primary" style={{ background: '#444', border: 'none', width: '100%' }}>Start for free</Button>
            <ul>
              <li>✅ 10 projects</li>
              <li>✅ 0.5 GB storage</li>
              <li>✅ 190 compute hours</li>
              <li>✅ Autoscaling up to 2 CU</li>
              <li>✅ Read replicas</li>
              <li>✅ Built-in high availability</li>
            </ul>
          </Card>
        </Col>

        {/* Launch Plan */}
        <Col xs={24} md={12} lg={6}>
          <Card title="Launch" bordered={false} style={{ background: '#111', color: 'white', border: '2px solid #00ff00' }}>
            <h2>$19/month</h2>
            <Button type="primary" style={{ background: '#00ff00', border: 'none', width: '100%' }}>Get started</Button>
            <ul>
              <li>✅ 100 projects</li>
              <li>✅ 10 GB storage</li>
              <li>✅ 300 compute hours</li>
              <li>✅ Autoscaling up to 4 CU</li>
              <li>✅ Organization accounts</li>
              <li>✅ Standard Support</li>
            </ul>
          </Card>
        </Col>

        {/* Scale Plan */}
        <Col xs={24} md={12} lg={6}>
          <Card title="Scale" bordered={false} style={{ background: '#111', color: 'white' }}>
            <h2>$69/month</h2>
            <Button type="primary" style={{ background: '#444', border: 'none', width: '100%' }}>Get started</Button>
            <ul>
              <li>✅ 1000 projects</li>
              <li>✅ 50 GB storage</li>
              <li>✅ 750 compute hours</li>
              <li>✅ Autoscaling up to 8 CU</li>
              <li>✅ IP Allow Rules</li>
              <li>✅ Datadog integration</li>
            </ul>
          </Card>
        </Col>

        {/* Business Plan */}
        <Col xs={24} md={12} lg={6}>
          <Card title="Business" bordered={false} style={{ background: '#111', color: 'white' }}>
            <h2>$700/month</h2>
            <Button type="primary" style={{ background: '#444', border: 'none', width: '100%' }}>Get started</Button>
            <ul>
              <li>✅ 5,000 projects</li>
              <li>✅ 500 GB storage</li>
              <li>✅ 1000 compute hours</li>
              <li>✅ Autoscaling up to 16+ CU</li>
              <li>✅ SOC 2, HIPAA (upon request)</li>
              <li>✅ 0-downtime migrations</li>
              <li>✅ Private Link</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Custom Plans */}
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} md={16}>
          <Card bordered={false} style={{ background: '#222', color: 'white', textAlign: 'center' }}>
            <h3>Custom Plans</h3>
            <p>Connect with our team for HIPAA compliance, annual contracts, higher resource limits, and more.</p>
            <Button type="primary" style={{ background: '#00ff00', border: 'none' }}>Talk to Sales</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
