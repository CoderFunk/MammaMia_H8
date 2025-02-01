import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
    </Container>
  );
};

export default LoginPage;