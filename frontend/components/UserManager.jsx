// react
import { useState } from 'react';
// contexts
import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/contexts/theme';
// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

function UserManager() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <div className='fixed bottom-0'>
      <div className='flex gap-2'>
        <UserButton
          setShowLoginModal={setShowLoginModal}
          setShowSignUpModal={setShowSignUpModal}
        />
        <ThemeButton />
      </div>

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
          title={'Logout'}
          variant='outline-secondary'
          size='sm'
          drop='up'
          align={{ offset: [0, 0] }}
          onClick={logout}
          className='mb-2'
        >
          <Dropdown.Item eventKey='1'>Account</Dropdown.Item>
        </SplitButton>
      ) : (
        <SplitButton
          title='Login'
          onClick={() => setShowLoginModal(true)}
          variant='outline-secondary'
          size='sm'
          drop='up'
          align={{ offset: [0, 0] }}
          className='mb-2'
        >
          <Dropdown.Item eventKey='1' onClick={() => setShowSignUpModal(true)}>
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
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
            />
          </div>
          <Button type='submit' variant='primary'>
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

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='outline-secondary'
      size='sm'
      className='mb-2'
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
          />
        </svg>
      )}
    </Button>
  );
}

export default UserManager;
