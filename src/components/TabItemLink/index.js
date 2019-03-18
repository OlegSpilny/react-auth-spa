import React from 'react';
import classnames from 'classnames';
import { NavItem, NavLink } from 'reactstrap';

export default ({ name, isActive, onToggle, ...rest }) => {
  return (
    <NavItem>
      <NavLink
        className={classnames({ 'active': isActive })}
        onClick={onToggle}
      >
        { name }
      </NavLink>
    </NavItem>
  );
};