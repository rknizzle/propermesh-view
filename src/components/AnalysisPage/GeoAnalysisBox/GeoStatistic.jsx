import { Statistic, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GeoStatistic = ({ title, value, preciseValue }) => {
  const formattedPreciseValue =
    typeof preciseValue === "number" ? preciseValue.toString() : preciseValue;

  const formattedValue = typeof value === "number" ? value.toString() : value;

  const shouldShowTooltip =
    formattedValue !== formattedPreciseValue && preciseValue !== null;

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
  preciseValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default GeoStatistic;
