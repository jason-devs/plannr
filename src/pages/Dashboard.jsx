import { useSelector } from "react-redux";

function Dashboard() {
  const name = useSelector(state => state.auth.currentUser.name);
  return (
    <div>
      <h2>Your DASHBOARD {name}</h2>
    </div>
  );
}

export default Dashboard;
