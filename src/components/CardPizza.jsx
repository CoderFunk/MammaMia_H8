import FormatoMiles from './FormatoMiles';
import iconPizza from '../assets/img/icon-pizza.png';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CardPizza = ({ id, nombre, imagen, ingredientes, precio, onAddToCart }) => {
  const navigate = useNavigate();
  const handleVerMas = () => {
    console.log('ID de pizza:', id); // Debug
    navigate(`/pizza/${id}`);
  };

  return (
    <Card className='cls-tamannio-cards'>
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body className="p-0">
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <Card.Title className='text-start'>Pizza {nombre}</Card.Title>
          </ListGroup.Item>
          <ListGroup.Item className='text-center'>
            <p>Ingredientes</p>
            <p className='cls-tamannio-ingredientes'>
              <img src={iconPizza} alt="iconoPizza"></img>
              <span> : </span>
              {ingredientes.join(', ')}
            </p>
          </ListGroup.Item>
          <ListGroup.Item className='text-center'>
            <strong>Precio: $<FormatoMiles numero={precio} /></strong>
            <div className="d-flex justify-content-between pt-4 pb-2">
              <Button 
                variant="outline-dark" 
                size="sm" 
                onClick={handleVerMas}
              >
                Ver Más 👀
              </Button>
              <Button 
                variant="dark" 
                size="sm" 
                onClick={onAddToCart}
              >
                Añadir 🛒
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;