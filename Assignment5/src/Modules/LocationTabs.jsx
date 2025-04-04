import { NavLink } from 'react-router-dom'
/**
 * LocationTabs component that navigates user to different pages.
 * @returns {JSX.Element} The rendered LocationTabs component.
 */
const LocationTabs = () => {

    return (
        <ul id="navigation" className="nav nav-tabs nav-fill">
            <li className="nav-item">
                <NavLink
                    to="/books"
                    className="nav-link"
                >
                    Book List
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/addBooks"
                    className="nav-link"
                >
                    Add Book
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to="/details"
                    className="nav-link"
                >
                    Book Detail
                </NavLink>
            </li>
        </ul>
    );
}

export default LocationTabs;