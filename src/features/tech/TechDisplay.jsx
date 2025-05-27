import { useState } from "react";
import { HiMagnifyingGlassCircle, HiMinusCircle } from "react-icons/hi2";
import TechNav from "./TechNav";
import { NavLink } from "react-router-dom";

function TechDisplay({ techStack, location }) {
  const [techMode, setTechMode] = useState("");

  return (
    <>
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">Tech-Stack</h2>
        <div className="flex">
          <button
            onClick={() =>
              setTechMode(techMode => (techMode === "delete" ? "" : "delete"))
            }
          >
            <HiMinusCircle className="h-[30px] w-[30px]" />
          </button>
          <NavLink to={`techs`}>
            <HiMagnifyingGlassCircle className="h-[30px] w-[30px]" />
          </NavLink>
        </div>
      </div>
      <TechNav
        techList={techStack?.techList}
        techMode={techMode}
        location={location}
      />
    </>
  );
}

export default TechDisplay;
