import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import LoginForm from "../components/LoginForm/LoginForm";

const AuthPage = ({ setUser }) => {
  const [key, setKey] = useState("login");

  return (
    <Container className="py-5">
      <div className="auth-container mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">LEVEL-UP GAMER</h2>

        <Tabs
          id="auth-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4"
          fill
        >
          <Tab eventKey="login" title="Iniciar Sesión">
            <LoginForm setUser={setUser} />
          </Tab>
          <Tab eventKey="register" title="Registrarse">
            <RegisterForm
              setUser={setUser}
              switchToLogin={() => setKey("login")}
            />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default AuthPage;
