import { NavLink } from "react-router-dom";

function TechCard({ tech }) {
  return (
    <NavLink
      className="flex items-center justify-center rounded-sm border border-dashed px-2 py-1"
      to={`${tech._id}`}
    >
      <h3 className="font-bold">{tech.name} &rarr;</h3>
    </NavLink>
  );
}

export default TechCard;
