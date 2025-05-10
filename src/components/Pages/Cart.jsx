import { useCart } from "../../context/CartContext";
import PropTypes from "prop-types";
import "../../styles/Cart.css";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{item.price} €</p>
        <div className="quantity-controls">
          <button className="btn" id="quantity-btn" onClick={decrementQuantity}>
            -
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button className="btn" id="quantity-btn" onClick={incrementQuantity}>
            +
          </button>
        </div>
        <p className="cart-item-subtotal">
          Subtotal: {(item.price * item.quantity).toFixed(2)} €
        </p>
        <button
          className="btn"
          id="remove-btn"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const EmptyCart = () => (
  <div className="empty-cart">
    <h1>Your Cart</h1>
    <p className="empty-cart-message">
      Your cart is empty. Feel free to browse some items and add them to the
      Shopping Cart.
    </p>
  </div>
);

const CartSummary = ({ total, onClearCart }) => (
  <div className="cart-summary">
    <p className="cart-total">Total: {total.toFixed(2)} €</p>
    <div className="cart-actions">
      <button className="btn clear-cart-btn" onClick={onClearCart}>
        Clear Cart
      </button>
      <button className="btn checkout-btn">Proceed to Checkout</button>
    </div>
  </div>
);

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  onClearCart: PropTypes.func.isRequired,
};

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <CartSummary total={getCartTotal()} onClearCart={clearCart} />
    </div>
  );
};

export default Cart;