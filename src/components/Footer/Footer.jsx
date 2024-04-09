import { forwardRef } from "react";
import { Row, Col } from "antd";
import "./footer.css";
import PropTypes from "prop-types";

const Footer = forwardRef((sticky, ref) => {
  const footerClass = `footer-container ${sticky ? "sticky" : ""}`;
  return (
    <div ref={ref} className={footerClass}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col id="footer-title">
          <img id="footer-logo" src="assets/favicon.png" alt="" />
        </Col>
        <Col id="footer-contact-info">
          <p id="footer-email">
            <a href="mailto:ryan@propermesh.com?subject=Inquiry&body=Hi%20Ryan,">
              ryan@propermesh.com
            </a>
          </p>
          <p id="footer-phone-number">
            <a href="tel:+16035600051">603-560-0051</a>
          </p>
        </Col>
      </Row>
    </div>
  );
});

Footer.displayName = "Footer";

Footer.propTypes = {
  sticky: PropTypes.bool,
};

Footer.defaultProps = {
  sticky: false,
};

export default Footer;
