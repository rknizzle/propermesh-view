import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ModelFileContext = createContext();

export const ModelFileProvider = ({ children }) => {
  const [fileFor3dModel, setFileFor3dModel] = useState(null);

  return (
    <ModelFileContext.Provider value={{ fileFor3dModel, setFileFor3dModel }}>
      {children}
    </ModelFileContext.Provider>
  );
};

ModelFileProvider.propTypes = {
  children: PropTypes.node,
};
