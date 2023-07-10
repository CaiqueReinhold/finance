import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/session';
import { logout } from '../../actions/account';

import Logo from '../Logo';
import IconButton from '../IconButton';
import DropdownMenu from '../DropdownMenu';
import { routes } from '../../routes';

function Header({ onMenuclick }) {
  const auth = useAuth();
  const { account } = useSelector((state) => state.account);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.SIGN_IN.path);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      } else if (e.code) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="py-5 border-b border-gray-200">
      <nav className="relative z-50 flex justify-between ">
        <div className="ml-2 flex items-center">
          {auth && (
            <IconButton onClick={onMenuclick}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M3.2 17.6v-1.35h17.65v1.35Zm0-4.95V11.3h17.65v1.35Zm0-4.9V6.4h17.65v1.35Z" />
              </svg>
            </IconButton>
          )}
        </div>
        <div className="flex items-center">
          <a className="flex" href="/">
            <Logo />
            <span className="font-[Bungee] text-3xl text-blue-600">Penny</span>
          </a>
        </div>
        <div className="flex items-center mr-5">
          {auth && (
            <>
              <button
                className="flex"
                onClick={() => setShowDropdown(!showDropdown)}
                ref={dropdownRef}
              >
                <span className="font-display capitalize text-base text-slate-900">
                  {account.name}
                </span>
                <span className="pt-[0.1rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                  >
                    <path d="M12 15 6.4 9.4l.975-.975L12 13.05l4.625-4.625.975.975Z" />
                  </svg>
                </span>
              </button>
              <DropdownMenu show={showDropdown} below={dropdownRef}>
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
