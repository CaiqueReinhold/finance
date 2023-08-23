import { useState, useEffect } from 'react';

import Header from './Header';
import SideNav from './SideNav';

function Layout({ children }) {
  const [showSideNav, setShowSideNav] = useState(
    sessionStorage.getItem('showSideNav') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem(
      'showSideNav',
      showSideNav === true ? 'true' : 'false'
    );
  }, [showSideNav]);

  const onMenuClick = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onMenuclick={onMenuClick} />
      <div className="flex flex-row h-full">
        <SideNav show={showSideNav} />
        <div className="p-5 w-full">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
