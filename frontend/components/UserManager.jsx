// react
import { useState } from "react";
// authentication
import { useAuth } from "@/contexts/auth";
// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserManager() {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
      {user ? (
        <Button
          onClick={logout}
          variant="outline-secondary"
          size="sm"
          className="mb-2"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => setShowLoginModal(true)}
          variant="outline-secondary"
          size="sm"
          className="mb-2"
        >Login</Button>
      )}

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
    </div>
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

export default UserManager;
