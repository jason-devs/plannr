import Modal from "../ui/Modal";

function Landing() {
  return (
    <div>
      <Modal>
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
            <h2>THIS IS THE SIGNUP</h2>
          </Modal.Header>
        </Modal.Content>
        <Modal.Content name="login">
          <Modal.Header>
            <h2>THIS IS THE LOGIN</h2>
          </Modal.Header>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Landing;
