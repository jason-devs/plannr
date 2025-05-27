import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiBars3, HiMiniBars3 } from "react-icons/hi2";
import { logoutSuccess } from "../auth/authSlice";
import api from "../../services/api";
import Menu from "../../ui/Menu";

function AppMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <>
      <Menu>
        <Menu.Toggle>
          <button>
            <HiBars3 size="1.5rem" />
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
    </>
  );
}

export default AppMenu;
