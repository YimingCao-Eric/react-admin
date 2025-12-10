/**
 * Menu Component
 * 
 * Sidebar navigation menu component that displays the main navigation links
 * for the admin panel. Includes links to Dashboard, Users, Roles, Products, and Orders.
 * Uses React Router's NavLink for active state management.
 */
    import React from "react";
    import { NavLink } from "react-router-dom";

    const Menu = () => {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to={'/'} end className="nav-link" >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/users'} end className="nav-link" >
                                Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/roles'} end className="nav-link" >
                                Roles
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/products'} end className="nav-link" >
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/orders'} end className="nav-link" >
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    export default Menu;