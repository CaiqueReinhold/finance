import clsx from 'clsx';

export function Select({
  className,
  items,
  selectedValue,
  label,
  onValueChanged,
}) {
  const handleChange = (e) => {
    e.preventDefault();
    if (onValueChanged) {
      onValueChanged(e.target.value);
    }
  };

  return (
    <div className={clsx(className)}>
      {label && (
        <label className="mb-3 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={selectedValue}
        className="block w-full rounded-md border
          border-gray-200 bg-gray-50 px-3 py-2 text-gray-900"
        onChange={handleChange}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.description}
          </option>
        ))}
      </select>
    </div>
  );
}
