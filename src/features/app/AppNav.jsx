import { NavLink, useParams } from "react-router-dom";

function AppNav() {
  const { projectId } = useParams();

  return (
    <nav className="flex w-full">
      {projectId ? (
        <>
          <NavLink
            to={`/dashboard/project/${projectId}#front-end`}
            className="flex items-center rounded-sm p-2 text-xs text-nowrap [&.active]:bg-black [&.active]:text-white"
          >
            Project Overview
          </NavLink>
        </>
      ) : null}
    </nav>
  );
}

export default AppNav;
