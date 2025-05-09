import { NavLink, Outlet } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";

function AppLayout() {
  return (
    <div className="grid h-full grid-rows-[50px_1fr_50px]">
      <header className="flex items-center justify-between">
        <h1>Plannr</h1>
        <button>
          <HiMiniBars3 />
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex items-center">
        <nav>
          <NavLink to="/">Home</NavLink>
        </nav>
      </footer>
    </div>
  );
}

export default AppLayout;
