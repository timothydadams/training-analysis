import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
import {
  InputWithLabel,
  BigButton,
  SmallTextButton,
} from '../components/FormComponents';
import { Title, LoginContainer, Message } from '../components/LoginComponents';
//ICON LIBRARIES
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';

//TESTING TOAST FUNCTIONALITY
import toast, { Toaster } from 'react-hot-toast';
import { Transition } from '@headlessui/react';

const testToast = ({ msg, success, error, info }) =>
  toast.custom((t) => (
    <Transition
      appear
      show={t.visible}
      className='transform p-4 max-w-sm w-full overflow-hidden rounded bg-gray-800 border-1 border-slate-400 shadow-md'
      enter='transition-all duration-150'
      enterFrom='opacity-0 scale-50'
      enterTo='opacity-100 scale-100'
      leave='transition-all duration-150'
      leaveFrom='opacity-100 scale-100'
      leaveTo='opacity-0 scale-75'
    >
      <div>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>
            <CheckCircleIcon
              className='h-6 w-6 text-green-400'
              aria-hidden='true'
            />
          </div>
          <div className='ml-3 w-0 flex-1 pt-0.5'>
            {/* <p className="text-sm font-medium text-gray-300">Success!</p> */}
            <p className='mt-1 text-sm text-gray-200'>{msg} 👋</p>
          </div>
          <div className='ml-4 flex-shrink-0 flex'>
            <button
              className='rounded-md inline-flex text-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={() => toast.dismiss(t.id)}
            >
              <span className='sr-only'>Close</span>
              {/*<FontAwesomeIcon icon={faTimes} />*/}
              <XIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  ));

const AUTHSTYLE =
  'w-full inline-flex cursor-pointer justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-black';

export const LoginPage = () => {
  const [token, setToken] = useToken();
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { state } = useLocation();

  const onLoginClicked = async () => {
    const response = await axios.post('/api/login', {
      email,
      password,
    });
    const { token } = response.data;
    setToken(token);
    navigate(state ? state.path : '/');
  };

  return (
    <LoginContainer>
      <ApiCheck />

      {errorMsg && <Message error>{errorMsg}</Message>}

      <Title>Sign in to your account</Title>

      <div className='space-y-6 mb-4'>
        <InputWithLabel
          label='Email'
          type='email'
          name='email'
          value={email}
          placeholder='email@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputWithLabel
          label='Password'
          type='password'
          name='password'
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <BigButton disabled={!email || !password} onClick={onLoginClicked}>
          Login
        </BigButton>
        <div className='flex items-center justify-between'>
          <SmallTextButton left onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </SmallTextButton>

          <SmallTextButton right onClick={() => navigate('/signup')}>
            Create Account
          </SmallTextButton>
        </div>
      </div>

      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-3 gap-3'>
          <div
            onClick={() => testToast('Hook up google auth')}
            className={AUTHSTYLE}
          >
            <span className='sr-only'>Sign in with Google</span>
            <FontAwesomeIcon icon={faGoogle} size='2x' />
          </div>

          <div
            onClick={() =>
              testToast(
                'Hook up twitter auth.  Also testing a much longer message here just to see what happens to the text inside the toast alert so we will see how it looks and what lines wrap.'
              )
            }
            className={AUTHSTYLE}
          >
            <span className='sr-only'>Sign in with Twitter</span>
            <FontAwesomeIcon icon={faTwitter} size='2x' />
          </div>

          <div
            onClick={() => testToast('Hook up github auth')}
            className={AUTHSTYLE}
          >
            <span className='sr-only'>Sign in with GitHub</span>
            <FontAwesomeIcon icon={faGithub} size='2x' />
          </div>
        </div>
      </div>
      <Toaster />
    </LoginContainer>
  );
};
