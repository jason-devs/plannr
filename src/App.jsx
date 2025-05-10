import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Landing from "./pages/Landing";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import api from "./services/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import Project from "./pages/Project";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: verify } = useMutation({
    mutationFn: () => api.get("/auth/verify"),
    onSuccess: response => {
      console.log(response.data);
      dispatch(loginSuccess(response.data.currentUser));
      navigate("/dashboard");
    },
    onError: err => {
      navigate("/");
      console.error(err);
    },
  });

  useEffect(
    function () {
      verify();
    },
    [verify],
  );

  return (
    <Routes>
      <Route path="*" element={<AppLayout />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="project/:projectId" element={<Project />} />
      </Route>
    </Routes>
  );
}

export default App;
