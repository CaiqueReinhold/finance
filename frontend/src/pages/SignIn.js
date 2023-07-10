import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRedirectAuthAccount } from '../hooks/session';
import { useAnimatedText } from '../hooks/text';
import { login } from '../actions/account';
import { routes } from '../routes';

import Card from '../components/Card';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Link from '../components/Link';
import Alert from '../components/Alert';

import EmailVerification from './EmailVerification';

function SignIn() {
  const dispatch = useDispatch();
  useRedirectAuthAccount();
  const showLoader = useSelector((state) => state.account.showLoader);
  const error = useSelector((state) => state.account.error);
  const showEmailValidation = useSelector(
    (state) => state.account.showEmailValidation
  );
  const animatedText = useAnimatedText('Signing in');

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(email)) {
      e.target.email.setCustomValidity('Invalid email address');
      return false;
    }
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      document.getElementsByName('password')[0].value = '';
    }
  }, [error]);

  if (showEmailValidation) {
    return <EmailVerification />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-10">
        <div>
          <Title>Sign in to your account</Title>
          <p className="text-center mt-2">
            Don't have an account yet?{' '}
            <Link to={routes.SIGN_UP.path}>Create an account</Link>.
          </p>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <Alert>{error}</Alert>}
            <Input
              name="email"
              type="email"
              label="Email Address"
              required
              autofocus={true}
              onChange={(e) => e.target.setCustomValidity('')}
            />
            <Input name="password" type="password" label="Password" required />
            <Button maxWidth disable={showLoader} type="submit">
              {showLoader ? animatedText : 'Sign in'}
            </Button>
            <Divider />
            <Link block>Forgot password?</Link>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
