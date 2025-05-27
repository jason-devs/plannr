import { useContext } from "react";
import BackendStackContext from "../backend stack/backendStackContext";
import ResourceDisplay from "../resource/ResourceDisplay";
import DataModelDisplay from "../data models/DataModelDisplay";
import TechDisplay from "../tech/TechDisplay";

function BackendDisplay() {
  const { currentBackendStack } = useContext(BackendStackContext);

  return (
    <>
      <ResourceDisplay />
      <DataModelDisplay />
      <TechDisplay techStack={currentBackendStack} location="backend" />
    </>
  );
}

export default BackendDisplay;
