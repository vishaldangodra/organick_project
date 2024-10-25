import "./Header.css";
import Logo from "../../images/Logo.png";
import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { card2 } from "../../pages/Data/Data";
import CartContextValue from "../../context/CartContextValue";
import { CartContext } from "../../context/CartContext";

const navbar = [
  {
    names: "Home",
    url: "/",
  },
  {
    names: "About",
    url: "/about",
  },
  {
    names: "Pages",
    icon: <FaAngleDown />,
    submenu: [
      { names: "Service_single", url: "/service_single" },
      { names: "Service", url: "/service" },
      { names: "Our Team", url: "/team" },
      { names: "Blog_news", url: "/blog_news" },
      { names: "Project", url: "/project" },
      { names: "Licenses", url: "/licenses" },
      { names: "Changelog", url: "/changelog" },
      { names: "Password", url: "/password" },
    ],
  },
  {
    names: "Shop",
    url: "/shop",
  },
  {
    names: "Contact",
    url: "/contact",
  },
];

function Header() {
  const userdata = useContext(CartContext);
  // console.log(userdata,"====>contextvalue");
  

  const navig = useNavigate();
  const location = useLocation();
  const totalpage = () => {
    navig("/total");
  };
  const handleClick = (item) => {
    navig("/shop_singel");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    localStorage.setItem("selectitem", JSON.stringify(item));
    console.log(item);
    seiscardvisible(false);
  };

  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(card2);
  const [cardvisible, seiscardvisible] = useState(true);
  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = card2.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            <span className="Organick">Organick</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navbar.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className={`nav-link ${
                      activeMenuItem === index ? "active" : ""
                    }`}
                    to={item.url}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    {item.names} {item.icon}
                    {item?.submenu?.length > 0 && (
                      <ul className="submenu p-0 text-center">
                        {item.submenu.map((submenuItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={submenuItem.url} className="header_link">
                              {submenuItem.names}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <form className="d-flex position-relative" role="search">
              <input
                className="form-control search me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="icon2">
                <CiSearch />
              </div>
              <div className="cart_main relative" onClick={totalpage}>
                <div className="cart_icon">
                  <AiOutlineShoppingCart />
                </div>
                <span className="cart_text">
                  Cart ({localStorage.getItem("cart_item1") || 0})
                  {/* Cart ({userdata || 0}) */}
                </span>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {(location.pathname === "/shop" || location.pathname === "/") &&
        cardvisible && (
          <div className="card-container row">
            {searchTerm && filteredData.length > 0 ? (
              filteredData.map((Card2, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
                >
                  <div className="card_main mb-4">
                    <div className="card_tag bg-color text-white mb-4">
                      {Card2.Tages}
                    </div>
                    <div>
                      <img
                        className="cardimg img-fluid ratio ratio-4x3 mb-2"
                        onClick={() => handleClick(Card2)}
                        src={Card2.Cardimg}
                        alt={Card2.title}
                      />
                    </div>
                    <p className="color font_family_roboto card_title mb-2">
                      {Card2.title}
                    </p>
                    <div className="border"></div>
                    <div className="d-flex justify-content-between d-block">
                      <div className="gap-2 d-flex">
                        <strike>{Card2.price}</strike>
                        <span className="price_tag color">
                          ${Card2.currentP}
                        </span>
                      </div>
                      <div className="star">
                        <img alt="Rating" src={Card2.Rating} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : searchTerm ? (
              <p>No results found.</p>
            ) : null}
          </div>
        )}
    </header>
  );
}

export default Header;
