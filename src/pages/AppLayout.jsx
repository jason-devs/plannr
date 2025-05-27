import { Outlet } from "react-router-dom";
import AppMenu from "../features/app/AppMenu";
import AppLogo from "../features/app/AppLogo";
import AppNav from "../features/app/AppNav";
import { useSelector } from "react-redux";

function AppLayout() {
  const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <div className="grid h-full grid-rows-[50px_1fr_50px] px-3">
      <header className="flex items-center justify-between">
        <AppLogo />
        <AppMenu />
      </header>
      <main className="no-scrollbar overflow-y-scroll">
        <Outlet />
      </main>
      <footer className="flex items-center">
        {currentUser === null ? <span>Welcome to Plannr!</span> : <AppNav />}
      </footer>
    </div>
  );
}

export default AppLayout;
