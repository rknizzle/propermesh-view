import { Statistic, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GeoStatistic = ({ title, value, preciseValue }) => {
  const shouldShowTooltip = preciseValue !== null && value !== preciseValue;

  return (
    <div className="statistic-container">
      {shouldShowTooltip ? (
        <Tooltip title={`Precise ${title}: ${preciseValue}`}>
          <Statistic
            title={
              <span>
                {title} <InfoCircleOutlined style={{ color: "#3e498f" }} />
              </span>
            }
            value={value}
          />
        </Tooltip>
      ) : (
        <Statistic title={title} value={value} />
      )}
    </div>
  );
};

GeoStatistic.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  preciseValue: PropTypes.number,
};

export default GeoStatistic;
