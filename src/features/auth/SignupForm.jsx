import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { loginSuccess } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: signup } = useMutation({
    mutationFn: credentials => api.post("/auth/signup", credentials),
    onSuccess: response => {
      const { name, projectList } = response.data.data.user;

      dispatch(loginSuccess({ name, projectList }));
      navigate("/dashboard");
    },
  });

  function handleSignup(data) {
    signup(data);
  }

  return (
    <Form onSubmit={handleSignup}>
      <Form.Label>
        <label htmlFor="name">Name:</label>
      </Form.Label>
      <Form.Input
        name="name"
        validation={{ required: true }}
        placeholder="Enter name..."
        id="name"
        type="text"
        autoComplete="name"
      />
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
        autoComplete="new-password"
      />
      <Form.Label>
        <label htmlFor="passwordConfirm">Password Confirm:</label>
      </Form.Label>
      <Form.Input
        name="passwordConfirm"
        validation={{ required: true }}
        placeholder="Enter password again..."
        id="passwordConfirm"
        type="password"
        autoComplete="new-password"
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
    </Form>
  );
}

export default SignupForm;
