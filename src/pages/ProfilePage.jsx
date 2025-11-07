import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile/UserProfile";

const ProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2>Debes iniciar sesión</h2>
        <Button variant="primary" onClick={() => navigate("/auth")}>
          Ir a Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <UserProfile user={user} setUser={setUser} />
    </Container>
  );
};

export default ProfilePage;
