import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top mb-5">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand d-flex align-items-center">
      <img
        src="/images/logo.png"
        alt="Tyohar by Garden Gems"
        style={{ height: "60px", width: "60px", borderRadius: "50%" }}
      />
      <div style={{ marginLeft: "10px" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>Garden Gems</div>
        <div style={{ fontSize: "1rem", textAlign: "center", fontStyle: "italic" }}>by Tyohar</div>
      </div>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div
      className="collapse navbar-collapse justify-content-start custom-toggle"
      id="navbarTogglerDemo01"
    >
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput />
        <li className="nav-item">
          <NavLink to="/" className="nav-link ">
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to={"/categories"}
            data-bs-toggle="dropdown"
          >
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to={"/categories"}>
                All Categories
              </Link>
            </li>
            {categories?.map((c) => (
              <li key={c.slug}>
                <Link className="dropdown-item" to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                style={{ border: "none" }}
              >
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        )}
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">
            <Badge count={cart?.length} showZero offset={[10, -5]}>
              <h3>🛒</h3>
            </Badge>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  );
};

export default Header;
