import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import api from "./services/api";
import AppLayout from "./pages/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Page from "./pages/Page";
import Component from "./pages/Component";
import Resource from "./pages/Resource";
import DataModel from "./pages/DataModel";
import Project from "./pages/Project";
import Techs from "./pages/Techs";
import Tech from "./pages/Tech";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: verify } = useMutation({
    mutationFn: () => api.get("/auth/verify"),
    onSuccess: response => {
      dispatch(loginSuccess(response.data.currentUser));
      navigate("/dashboard/project");
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
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="project" element={<Project />} />
          <Route path="project/:projectId" element={<Project />} />
          <Route path="project/:projectId/page/:pageId" element={<Page />} />
          <Route
            path="project/:projectId/component/:componentId"
            element={<Component />}
          />
          <Route path="project/:projectId/techs" element={<Techs />} />
          <Route path="project/:projectId/techs/:techId" element={<Tech />} />
          <Route
            path="project/:projectId/resource/:resourceId"
            element={<Resource />}
          />
          <Route
            path="project/:projectId/data-model/:dataModelId"
            element={<DataModel />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
