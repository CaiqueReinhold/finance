import { useDispatch } from 'react-redux';

import { routes } from '../routes';
import { resetEmailValidationPage } from '../actions/account';

import Card from '../components/Card';
import Title from '../components/Title';
import Divider from '../components/Divider';
import Link from '../components/Link';

function EmailVerification() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-2">
      <div className="max-w-md w-full space-y-10">
        <div>
          <Title>Almost there...</Title>
        </div>
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl text-center text-bold">
              Email verification
            </h2>
            <p className="text-justify tracking-tight text-slate-700">
              We sent a message to your email address with instrunctions to
              verify your account. Please check your email and click the
              verification link before you proceed to login.
            </p>
            <Divider />
            <Link
              block
              to={routes.SIGN_IN.path}
              onClick={() => dispatch(resetEmailValidationPage())}
            >
              I'm all set, proceed to sign in
            </Link>
            <Link block>Didn't receive the email? Request it again</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EmailVerification;
