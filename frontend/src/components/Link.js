import { useNavigate } from 'react-router-dom';

function Link({ children, to, block = false, onClick = null }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return (
    <a
      className={
        'text-blue-600 text-center hover:text-blue-400 ' +
        'hover:cursor-pointer' +
        (block ? ' block' : '')
      }
      onClick={handleClick}
      href={to}
    >
      {children}
    </a>
  );
}

export default Link;
