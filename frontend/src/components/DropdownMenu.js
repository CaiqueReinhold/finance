function DropdownMenu({ children, show = false, below = null }) {
  if (!show) {
    return null;
  }
  if (typeof children !== Array) {
    children = [children];
  }

  const style = {
    position: 'absolute',
    top: below?.current
      ? below.current.offsetTop + below.current.offsetHeight
      : 0,
    left: below?.current ? below.current.offsetLeft : 0,
  };
  return (
    <ul style={style} className="shadow-lg rounded-lg bg-white">
      {children.map((child, index) => (
        <li className="p-4" key={index}>
          {child}
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
