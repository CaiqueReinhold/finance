function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  maxWidth = false,
  disable = false,
}) {
  let classes = '';

  if (variant === 'primary') {
    classes = 'bg-blue-600 hover:bg-blue-500 active:bg-blue-800';
  } else if (variant === 'secondary') {
    classes = 'bg-gray-600 hover:bg-gray-500 active:bg-gray-800';
  } else if (variant === 'danger') {
    classes = 'bg-red-600 hover:bg-red-500 active:bg-red-800';
  }

  return (
    <button
      className={
        'spinner-grow group inline-flex items-center justify-center rounded-full py-2 ' +
        'px-4 text-sm font-semibold focus:outline-none ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
        'text-white hover:text-slate-100 active:text-blue-100 ' +
        classes +
        (maxWidth ? 'w-full ' : '') +
        (disable ? 'cursor-not-allowed opacity-50' : '')
      }
      onClick={onClick}
      type={type}
      disabled={disable}
    >
      {children}
    </button>
  );
}

export default Button;
