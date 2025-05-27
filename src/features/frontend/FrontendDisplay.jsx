import { useContext } from "react";
import FrontendStackContext from "../frontend stack/frontendStackContext";
import TechDisplay from "../tech/TechDisplay";
import ComponentDisplay from "../component/ComponentDisplay";
import PageDisplay from "../page/PageDisplay";

function FrontendDisplay() {
  const { currentFrontendStack } = useContext(FrontendStackContext);

  return (
    <>
      <PageDisplay />
      <ComponentDisplay />
      <TechDisplay techStack={currentFrontendStack} location="frontend" />
    </>
  );
}

export default FrontendDisplay;
