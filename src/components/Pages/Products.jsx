import {useState, useEffect} from "react";
import getFakeStoreProducts from "../../apis/fakeStoreAPI";
import "../../styles/Products.css";

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
        }
        getProducts();
        return () => {
            setProducts(null);
        };
    }, [])

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
              <div className="product-card" key={product.id}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
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
                  <button className="btn" id="add-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
}

export default Products;