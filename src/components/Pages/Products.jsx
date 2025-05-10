import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext";
import getFakeStoreProducts from "../../apis/fakeStoreAPI";
import "../../styles/Products.css";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const productInCart = isInCart(product.id);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = (e) => {
    e.stopPropagation(); 
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = (e) => {
    e.stopPropagation(); 
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleCartAction = (e) => {
    e.stopPropagation(); 
    if (productInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product, quantity);
      setQuantity(1);
    }
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
        <div className="quantity-selector" onClick={(e) => e.stopPropagation()}>
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
        <button
          className={`btn ${productInCart ? "remove-btn" : "add-btn"}`}
          onClick={handleCartAction}
        >
          {productInCart ? "Remove from Cart" : "Add to Cart"}
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const Products = () => {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];
  const totalPages = products
    ? Math.ceil(products.length / productsPerPage)
    : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      {products && products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Products;