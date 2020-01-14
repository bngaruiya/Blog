import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side_drawer';
  if (props.show) {
    drawerClasses = 'side_drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Articles</a>
        </li>
        <li>
          <a href="/">Notebooks</a>
        </li>
        <li>
          <a href="/">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
