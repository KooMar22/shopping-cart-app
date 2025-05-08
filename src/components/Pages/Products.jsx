import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext";
import getFakeStoreProducts from "../../apis/fakeStoreAPI";
import "../../styles/Products.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.title} />
      <div className="product-info">
        <h2 className="product-name">{product.title}</h2>
        <h3 className="product-category">{product.category}</h3>
        <p className="product-description">{product.description}</p>
        <h4 className="product-price">{product.price} €</h4>
        <div className="additional-info">
          <p className="product-rating">
            Rating: {product.rating.rate} ({product.rating.count})
          </p>
          <p className="product-stock">Stock: {product.rating.count}</p>
        </div>
        <div className="quantity-selector">
          <button className="btn quantity-btn" onClick={decrementQuantity}>
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button className="btn quantity-btn" onClick={incrementQuantity}>
            +
          </button>
        </div>
        <button className="btn" id="add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

const Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await getFakeStoreProducts(
          "https://fakestoreapi.com/products"
        );
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
    return () => {
      setProducts(null);
    };
  }, []);

  return (
    <div className="products-page">
      {loading && (
        <p className="paragraph" id="loading">
          Loading products...
        </p>
      )}
      {error && (
        <p className="paragraph" id="error">
          Error: {error}
        </p>
      )}
      {products && products.length === 0 && (
        <p className="paragraph" id="no-products">
          No products available
        </p>
      )}
      <div className="products-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;