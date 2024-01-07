import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css'; 

const AdminNavigation = () => {
  return (
    <nav className="navigation-bar">
      <NavLink to="/staff/order" activeClassName="active-link">Orders</NavLink>
      <NavLink to="/staff/view_user" activeClassName="active-link">Users</NavLink>
      <NavLink to="/staff/add_menu" activeClassName="active-link">Menu</NavLink>
      <NavLink to="/staff/add_offer" activeClassName="active-link">Offers</NavLink>
      <NavLink to="/staff/view_message" activeClassName="active-link">Messages</NavLink>
      <NavLink to="/staff/add_user" activeClassName="active-link">Staffs</NavLink>
    </nav>
  );
};

export default AdminNavigation;
