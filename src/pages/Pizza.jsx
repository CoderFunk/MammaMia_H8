import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MiContexto } from '../context/MiContexto';

const Pizza = () => 
{ 
    const { setCart, calculateTotal } = useContext(MiContexto);
    const { id } = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = useState({})

    // Añadir handler para el carrito
    const handleAddToCart = () => {
        setCart((prevCart) => {
          const existingPizza = prevCart.find((item) => item.id === pizza.id);
          if (existingPizza) {
            return prevCart.map((item) =>
              item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...prevCart, { ...pizza, quantity: 1 }];
        });
        calculateTotal();
      };
      
    useEffect(() => {
        fetch(`http://localhost:5000/api/pizzas/${id}`)

        .then( (res) => res.json() )
        .then( (data) => {  
            setPizza(data)
            console.log(data);
            })
    }, [])

    return (
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={pizza.img} 
                  alt={pizza.name}
                  className="img-fluid"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
    
                <Card.Body className="p-4">
                  <Card.Title className="display-6 mb-4">Pizza {pizza.name}</Card.Title>
    
                  <div className="text-center mb-4">
                    <h3 className="text-success mb-3">${pizza.price}</h3>
                    <p className="text-muted">{pizza.desc}</p>
                  </div>
    
                  <div className="ingredients-section mb-4">
                    <h4 className="text-center mb-3">🍕 Ingredientes</h4>
                    <ul className="list-unstyled">
                      {pizza.ingredients?.map((ingredient, index) => (
                        <li key={index} className="text-center py-1">
                          • {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
    
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate('/')}
                    >
                      ← Volver
                    </Button>
                    <Button variant="success"
                      onClick={handleAddToCart}
                    >
                      Añadir al Carrito 🛒
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
};


export default Pizza;