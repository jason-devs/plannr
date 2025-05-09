import LoginForm from "../features/auth/LoginForm";
import SignupForm from "../features/auth/SignupForm";
import Modal from "../ui/Modal";

function Landing() {
  return (
    <Modal>
      <div className="h-full">
        <Modal.Overlay />
        <h2>Plan apps the Jonas way!</h2>
        <p>
          Based on the methods taught by Jonas Schmedtmann in his React course.
        </p>
        <Modal.Toggle name="signup">
          <button>Sign Up</button>
        </Modal.Toggle>
        <button>Use Demo</button>
        <p>
          Or
          <Modal.Toggle name="login">
            <button>Log In</button>
          </Modal.Toggle>
          here.
        </p>
        <Modal.Content name="signup">
          <Modal.Header>
            <h2>Signup</h2>
          </Modal.Header>
          <SignupForm />
        </Modal.Content>
        <Modal.Content name="login">
          <Modal.Header>
            <h2>Login</h2>
          </Modal.Header>
          <LoginForm />
        </Modal.Content>
      </div>
    </Modal>
  );
}

export default Landing;
