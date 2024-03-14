// react
import { useState } from "react";
// authentication
import { useAuth } from "@/contexts/auth";
// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";

function UserManager() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className="fixed bottom-0">
      <UserButton
        setShowLoginModal={setShowLoginModal}
        setShowSignUpModal={setShowSignUpModal}
      />

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />

      <SignUpModal
        show={showSignUpModal}
        handleClose={() => setShowSignUpModal(false)}
      />
    </div>
  );
}

function UserButton({ setShowLoginModal, setShowSignUpModal }) {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <SplitButton
          title={user.username}
          variant="outline-secondary"
          size="sm"
          drop="up"
          align={{ offset: [0, 0] }}
          className="mb-2"
        >
          <Dropdown.Item eventKey="1" onClick={logout}>
            Logout
          </Dropdown.Item>
        </SplitButton>
      ) : (
        <SplitButton
          title="Login"
          onClick={() => setShowLoginModal(true)}
          variant="outline-secondary"
          size="sm"
          drop="up"
          align={{ offset: [0, 0] }}
          className="mb-2"
        >
          <Dropdown.Item eventKey="1" onClick={() => setShowSignUpModal(true)}>
            Sign Up
          </Dropdown.Item>
        </SplitButton>
      )}
    </>
  );
}

function LoginModal({ show, handleClose }) {
  const { login } = useAuth();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;
            login(username, password);
            handleClose();
          }}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function SignUpModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Sign Up Coming Soon</p>
      </Modal.Body>
    </Modal>
  );
}

export default UserManager;
