import LoginForm from "../features/auth/LoginForm";
import SignupForm from "../features/auth/SignupForm";
import Modal from "../ui/Modal";

function Landing() {
  return (
    <Modal>
      <div className="flex h-full flex-col gap-3">
        <Modal.Overlay />
        <h2 className="text-4xl">Plan apps the Jonas way!</h2>
        <p className="text-sm">
          Based on the methods taught by Jonas Schmedtmann in his React course.
        </p>
        <div className="flex gap-3">
          <Modal.Toggle name="signup">
            <button className="rounded-sm bg-black px-3 py-1 text-2xl text-white">
              Sign Up
            </button>
          </Modal.Toggle>
          <button className="rounded-sm border px-3 py-1 text-2xl">
            Use Demo
          </button>
        </div>
        <p className="flex gap-1">
          Or
          <Modal.Toggle name="login">
            <button className="font-black">Log In</button>
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
