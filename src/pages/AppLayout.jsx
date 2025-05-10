import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import Menu from "../ui/Menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/auth/authSlice";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(state => state.auth.currentUser?.name);
  const isLoggedIn = Boolean(name);
  const curProject = useQueryClient().getQueryData(["project"]);

  const { mutate: logout } = useMutation({
    mutationFn: () => api.get("/auth/logout"),
    onSuccess: () => {
      navigate("/");
      dispatch(logoutSuccess());
    },
    onError: err => console.error(err),
  });

  function handleLogout() {
    logout();
  }

  return (
    <div className="grid h-full grid-rows-[50px_1fr_50px]">
      <header className="flex items-center justify-between">
        <h1>Plannr</h1>
        <Menu>
          <Menu.Toggle>
            <button>
              <HiMiniBars3 />
            </button>
          </Menu.Toggle>
          <Menu.Window>
            <ul className="absolute top-10 left-full -translate-x-full bg-blue-800">
              <Menu.Item>
                <li>
                  <button onClick={handleLogout}>LOGOUT</button>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li>
                  <button>SETTINGS</button>
                </li>
              </Menu.Item>
            </ul>
          </Menu.Window>
        </Menu>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex items-center">
        {isLoggedIn && (
          <nav className="flex gap-1">
            <Link to="/dashboard">Dashboard</Link>
            <Link
              to={`/project/${curProject._id || "681f710133941f1de48c80cc"}`}
            >
              Current Project
            </Link>
          </nav>
        )}
      </footer>
    </div>
  );
}

export default AppLayout;
