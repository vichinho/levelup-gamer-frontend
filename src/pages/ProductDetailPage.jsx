import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Alert } from "react-bootstrap";
import ProductReview from "../components/ProductReview/ProductReview";
import "./ProductDetailPage.css";

const ProductDetailPage = ({ products, addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          <h4>Producto no encontrado</h4>
          <Button variant="primary" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmitReview = (review) => {
    setReviews([...reviews, review]);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <Container className="py-5">
      {showAlert && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1050 }}
        >
          Producto agregado al carrito
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <div className="product-detail-image">
            <img
              src={product.image || "https://via.placeholder.com/500"}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
        </Col>

        <Col md={6}>
          <div className="product-detail-info">
            <div className="mb-2">
              <Badge bg="primary">{product.category}</Badge>
              <span className="text-muted ms-2">{product.code}</span>
            </div>

            <h1 className="product-detail-title">{product.name}</h1>

            {reviews.length > 0 && (
              <div className="mb-3">
                <span className="rating-stars">
                  {"★".repeat(Math.round(calculateAverageRating()))}
                  {"☆".repeat(5 - Math.round(calculateAverageRating()))}
                </span>
                <span className="ms-2 text-muted">
                  {calculateAverageRating()} ({reviews.length} reseñas)
                </span>
              </div>
            )}

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-price mb-4">
              {product.discount && (
                <span className="discount-badge me-2">
                  -{product.discount}%
                </span>
              )}
              <span className="price-amount">
                ${product.price.toLocaleString("es-CL")} CLP
              </span>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="quantity-selector">
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="quantity-display">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </Button>
              </div>
              <Button
                variant="success"
                size="lg"
                onClick={handleAddToCart}
                className="flex-grow-1"
              >
                Agregar al Carrito
              </Button>
            </div>

            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={8}>
          <h3 className="mb-4">Reseñas de Clientes</h3>

          {reviews.length > 0 ? (
            <div className="reviews-list mb-4">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>{review.userName}</strong>
                      <div className="review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <small className="text-muted">
                      {new Date(review.date).toLocaleDateString("es-CL")}
                    </small>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <Alert variant="info">
              Sé el primero en dejar una reseña de este producto
            </Alert>
          )}

          <ProductReview
            productId={product.id}
            onSubmitReview={handleSubmitReview}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
