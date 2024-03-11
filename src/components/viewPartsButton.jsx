import { Button } from "antd";

const ViewParts = () => {
  const clicked = () => {
    console.log("View Parts button clicked");
    fetch("/api/v0/parts")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Button onClick={() => clicked()}> View Parts </Button>
    </>
  );
};

export default ViewParts;
