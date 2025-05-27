import { NavLink, useLocation, useParams } from "react-router-dom";

const frontEndLinks = ["Pages", "Components", "Tech Stack"];
const backEndLinks = ["Data Model", "Tech Stack"];

function ProjectNav() {
  const { hash } = useLocation();
  const { projectId } = useParams();

  if (!projectId) return null;

  return (
    <>
      {hash === "#front-end"
        ? frontEndLinks.map(link => (
            <NavLink
              key={link}
              to={`/`}
              className="flex items-center rounded-sm p-2 text-xs text-nowrap [&.active]:bg-black [&.active]:text-white"
            >
              {link}
            </NavLink>
          ))
        : backEndLinks.map(link => (
            <NavLink
              key={link}
              to={`/`}
              className="flex items-center rounded-sm p-2 text-xs text-nowrap [&.active]:bg-black [&.active]:text-white"
            >
              {link}
            </NavLink>
          ))}
    </>
  );
}

export default ProjectNav;
