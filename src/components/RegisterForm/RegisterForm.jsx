import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {
  validateEmail,
  isOver18,
  validatePassword,
} from "../../utils/validators";

const RegisterForm = ({ setUser, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateEmail(formData.email)) {
      setError("Email inválido");
      return;
    }

    if (!isOver18(formData.birthDate)) {
      setError("Debes ser mayor de 18 años");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const referralCode =
      "LUG" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newUser = {
      name: formData.name,
      email: formData.email,
      birthDate: formData.birthDate,
      referralCode: referralCode,
    };

    setUser(newUser);
    setSuccess(true);

    setTimeout(() => {
      switchToLogin();
    }, 2000);
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">¡Registro exitoso! Redirigiendo...</Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="register-name">Nombre Completo</Form.Label>
        <Form.Control
          id="register-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="register-email">Email</Form.Label>
        <Form.Control
          id="register-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="register-birthdate">
          Fecha de Nacimiento
        </Form.Label>
        <Form.Control
          id="register-birthdate"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="register-password">Contraseña</Form.Label>
        <Form.Control
          id="register-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Mínimo 6 caracteres"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="register-confirm-password">
          Confirmar Contraseña
        </Form.Label>
        <Form.Control
          id="register-confirm-password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit" className="w-100">
        Registrarse
      </Button>
    </Form>
  );
};

export default RegisterForm;
