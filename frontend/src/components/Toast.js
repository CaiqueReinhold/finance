import { Success, Info, Alert } from './Icons';

const CLASSES = {
  success: 'bg-green-500',
  info: 'bg-blue-500',
  error: 'bg-red-500',
  right: 'bottom-5 right-5',
  left: 'bottom-5 left-5',
  center: 'bottom-5 left-1/2 transform -translate-x-1/2',
};

export function Toast({ message, type = 'success', align = 'left' }) {
  return (
    <div
      className={
        'p-3 text-white fixed flex rounded-md shadow-lg ' +
        CLASSES[type] +
        ' ' +
        CLASSES[align]
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
