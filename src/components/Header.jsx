import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";

const Header = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  
  return (
    <header className="header">
      <h1 className="title">Marko's Fake Products Store</h1>
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.prototype = {
  itemCount: PropTypes.number,
}

export default Header;
