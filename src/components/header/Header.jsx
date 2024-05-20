/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const headerColor = useHeaderColor();
    const [modalOpened, setModalOpened] = useState(false);
    const { isLogged, logout } = useUserDetails()
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const { validateLogin } = useAuthCheck();

    const navigate = useNavigate()

    const handleNavigateToHomePage = () => {
        navigate('/')
    }

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }

    const handleNavigateToSettingPage = () => {
        navigate('/settings')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <section className="h-wrapper" style={{ background: headerColor }}>
            <div className="flexCenter innerWidth paddings h-container">
                {/* logo */}
                <Link to="/">
                    <img src="../" alt="logo" width={100} />
                </Link>

                {/* menu */}
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setMenuOpened(false);
                    }}
                >
                    <div
                        // ref={menuRef}
                        className="flexCenter h-menu"
                        style={getMenuStyles(menuOpened)}
                    >
                        <NavLink to="/properties">Properties</NavLink>

                        <a href="mailto:zainkeepscode@gmail.com">Contact</a>

                        {/* add property */}
                        <div onClick={handleAddPropertyClick}>Add Property</div>
                        <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
                        {/* login button */}
                        {!isLogged ? (
                            <button className="button" onClick={handleNavigateToAuthPage}>
                                Login
                            </button>
                        ) : (
                            <ProfileMenu user={user} logout={handleLogout} />
                        )}
                    </div>
                </OutsideClickHandler>

                {/* for medium and small screens */}
                <div
                    className="menu-icon"
                    onClick={() => setMenuOpened((prev) => !prev)}
                >
                    <BiMenuAltRight size={30} />
                </div>
            </div>
        </section>
    );
};

export default Header;