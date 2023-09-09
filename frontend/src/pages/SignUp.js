import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createAccount } from '../actions/account';
import { useRedirectAuthAccount } from '../hooks/session';
import { useAnimatedText } from '../hooks/text';
import { routes } from '../routes';

import Card from '../components/Card';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import Link from '../components/Link';
import Alert from '../components/Alert';

import EmailVerification from './EmailVerification';

function SignUp() {
  const dispatch = useDispatch();
  useRedirectAuthAccount();
  const showLoader = useSelector((state) => state.account.showLoader);
  const error = useSelector((state) => state.account.error);
  const animatedText = useAnimatedText('Creating account');
  const showEmailValidation = useSelector(
    (state) => state.account.showEmailValidation
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
      email: e.target.email.value,
    };
    dispatch(createAccount(data));
  };

  if (showEmailValidation) {
    return <EmailVerification />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-10">
        <div>
          <Title className="text-center">Create an account</Title>
          <p className="text-center mt-2">
            Already have an account?{' '}
            <Link to={routes.SIGN_IN.path}>Sign in to your account</Link>.
          </p>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <Alert>{error}</Alert>}
            <Input
              name="name"
              type="text"
              label="Full name"
              required
              autofocus
              placeholder="John Doe"
            />
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@email.com"
              required
            />
            <Input name="password" type="password" label="Password" required />
            <Input
              name="password2"
              type="password"
              label="Confirm Password"
              required
            />
            <Button maxWidth disable={showLoader} type="submit">
              {showLoader ? animatedText : 'Create account'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
