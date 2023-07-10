import clsx from 'clsx';

function Input({
  type,
  name,
  label,
  value,
  placeholder,
  onChange,
  required = false,
  autofocus = false,
  className,
}) {
  return (
    <div className={clsx(className)}>
      {label && (
        <label className="mb-3 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className="block w-full appearance-none rounded-md border
          border-gray-200 bg-gray-50 px-3 py-2 text-gray-900
          placeholder-gray-400 focus:border-blue-500 focus:bg-white
          focus:outline-none focus:ring-blue-500 sm:text-sm focus:invalid:border-red-500"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        autoFocus={autofocus}
      />
    </div>
  );
}

export default Input;
