import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = ({
  cartItems,
  updateQuantity,
  removeItem,
  clearCart,
  user,
}) => {
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    if (user && user.email.toLowerCase().endsWith("@duocuc.cl")) {
      return calculateSubtotal() * 0.2;
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    alert("Procesando compra...");
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p className="text-secondary">
          Agrega productos para comenzar tu compra
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Ver Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Carrito de Compras</h2>

      <Row>
        <Col lg={8}>
          <Table responsive className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="product-image-small me-3">
                        <img
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name}
                        />
                      </div>
                      <div>
                        <div className="fw-bold">{item.name}</div>
                        <div className="text-secondary small">{item.code}</div>
                      </div>
                    </div>
                  </td>
                  <td>${item.price.toLocaleString("es-CL")}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="form-control quantity-input-cart"
                    />
                  </td>
                  <td className="fw-bold">
                    ${(item.price * item.quantity).toLocaleString("es-CL")}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      ✕
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="outline-danger" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </Col>

        <Col lg={4}>
          <div className="cart-summary">
            <h4 className="mb-4">Resumen de Compra</h4>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toLocaleString("es-CL")}</span>
            </div>

            {calculateDiscount() > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Descuento DuocUC (20%):</span>
                <span>-${calculateDiscount().toLocaleString("es-CL")}</span>
              </div>
            )}

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <strong>Total:</strong>
              <strong className="text-success fs-4">
                ${calculateTotal().toLocaleString("es-CL")}
              </strong>
            </div>

            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={handleCheckout}
            >
              Finalizar Compra
            </Button>

            <Button
              variant="outline-primary"
              className="w-100"
              onClick={() => navigate("/")}
            >
              Seguir Comprando
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
