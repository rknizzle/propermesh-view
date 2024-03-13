import { useContext } from "react";
import { ModelFileContext } from "./3dModelFileContext";

export const useModelFile = () => useContext(ModelFileContext);
