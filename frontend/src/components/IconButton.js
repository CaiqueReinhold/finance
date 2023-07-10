const CLASSES = {
  minimal: 'hover:bg-slate-200 active:bg-slate-100',
  primary:
    'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-lg',
  secondary: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400',
};

function IconButton({ children, onClick, type = 'minimal' }) {
  return (
    <button
      type="button"
      className={'rounded-full p-2 ' + CLASSES[type]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
