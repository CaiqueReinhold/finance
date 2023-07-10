import IconButton from './IconButton';

export function List({ children }) {
  return <ul className="divide-y divide-gray-200">{children}</ul>;
}

export function ListItem({ image, description, actions }) {
  return (
    <li className="py-4 px-2">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap content-center">
          <span className="mr-5 flex">{image}</span>
          <p className="flex content-center flex-wrap text-sm font-medium text-gray-900">
            {description}
          </p>
        </div>
        <div className="flex space-x-4">
          {actions.map((action, i) => (
            <IconButton key={i} onClick={action.onClick}>
              {action.name}
            </IconButton>
          ))}
        </div>
      </div>
    </li>
  );
}
