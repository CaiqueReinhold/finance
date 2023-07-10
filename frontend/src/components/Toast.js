import { Success, Info, Alert } from './Icons';

const CLASSES = {
  success: 'bg-green-500',
  info: 'bg-blue-500',
  error: 'bg-red-500',
};

export function Toast({ message, type = 'success', onClose = () => {} }) {
  return (
    <div
      className={
        'p-3 text-white fixed bottom-5 right-5 flex rounded-md shadow-lg ' +
        CLASSES[type]
      }
    >
      <span className="mr-3">
        {type === 'success' && Success(24, 24, '#FFF')}
        {type === 'info' && Info(24, 24, '#FFF')}
        {type === 'error' && Alert(24, 24, '#FFF')}
      </span>
      <div>{message}</div>
    </div>
  );
}

export default Toast;
