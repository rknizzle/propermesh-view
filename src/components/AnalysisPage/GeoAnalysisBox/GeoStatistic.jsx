import { Statistic, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GeoStatistic = ({ title, value }) => {
  const displayValue = (value) => {
    if (value === null) {
      return "--";
    }

    // I put Shells and Boundary Edges back into GeoStatistic to keep the "--" display consistent
    // It's also a plus that if we need a precise value for these two in the future,
    // We're already set up for it
    if (title === "# of Shells" || title === "# of Boundary Edges") {
      return value;
    }

    const integerPart = value.toString().split(".")[0];

    let decimalPlaces = 3;

    if (integerPart.length > 8) {
      return integerPart;
    } else if (integerPart.length > 7) {
      decimalPlaces = 1;
    } else if (integerPart.length > 6) {
      decimalPlaces = 2;
    }

    const roundedValue = value.toFixed(decimalPlaces);
    return roundedValue;
  };

  const shouldShowTooltip = displayValue(value) !== value && value !== null;

  return (
    <div className="statistic-container">
      {shouldShowTooltip ? (
        <Tooltip title={`Precise ${title}: ${value}`}>
          <Statistic
            title={
              <span>
                {title} <InfoCircleOutlined style={{ color: "#3e498f" }} />
              </span>
            }
            value={displayValue(value)}
          />
        </Tooltip>
      ) : (
        <Statistic title={title} value={displayValue(value)} />
      )}
    </div>
  );
};

GeoStatistic.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export default GeoStatistic;
