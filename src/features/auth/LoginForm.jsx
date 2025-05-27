import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginSuccess } from "../auth/authSlice";
import Form from "../../ui/Form";
import api from "../../services/api";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationFn: credentials => api.post("/auth/login", credentials),
    onSuccess: response => {
      const { name, projectList } = response.data.data.user;

      dispatch(loginSuccess({ name, projectList }));
      navigate("/dashboard/project");
    },
  });

  function handleLogin(data) {
    login(data);
  }
  return (
    <Form onSubmit={handleLogin}>
      <Form.Label>
        <label htmlFor="email">Email:</label>
      </Form.Label>
      <Form.Input
        name="email"
        validation={{ required: true }}
        placeholder="Enter email..."
        id="email"
        type="text"
        autoComplete="email"
      />
      <Form.Label>
        <label htmlFor="password">Password:</label>
      </Form.Label>
      <Form.Input
        name="password"
        validation={{ required: true }}
        placeholder="Enter password..."
        id="password"
        type="password"
        autoComplete="current-password"
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
    </Form>
  );
}

export default LoginForm;
