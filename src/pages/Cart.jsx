import { useContext } from 'react';
import { MiContexto } from '../context/MiContexto';
import { UserContext } from '../context/UserContext'; // ✅ Agregar import
import { Button} from 'react-bootstrap';


function Cart() {
  const { cart, setCart, total } = useContext(MiContexto);
  const { token } = useContext(UserContext); // ✅ Obtener token

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ cart })
      });

      if (!response.ok) {
        throw new Error('Error al procesar el checkout');
      }

      const data = await response.json();
      console.log('Checkout exitoso:', data);
      setCart([]);
      alert('¡Compra realizada con éxito!');

    } catch (error) {
      console.error("Error en checkout:", error);
      alert('Error al procesar la compra');
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-8">Carrito de compras</h1>
      {cart.map((item) => (
        <div className='d-flex jcse p-4 mb-4' key={item.id}>
          <img src={item.img} alt={item.name} className='imgCart' />
          <div id='namePriceCart'>
            <h2>{item.name}</h2>
            <p>$ {item.price}</p>
          </div>
          <div className='btnSpaceFlex'>
            <button onClick={() => increaseQuantity(item.id)} className='bg-blue-500 text-white px-3 py-1 rounded'>+</button>
            <p id='QuantyCart'>{item.quantity}</p>
            <button onClick={() => decreaseQuantity(item.id)} className='bg-red-500 text-white px-3 py-1 rounded'>-</button>
          </div>
        </div>
      ))}
      <div className='divTotalCart'>
      <h3>Total: $ {total}</h3>
        <Button 
          variant="success"
          disabled={!token || cart.length === 0}  // Deshabilitar si no hay token o carrito vacío
          onClick={handleSubmit}  // Agregar manejador de evento
          >
          {!token 
            ? 'Inicia sesión para pagar'
            : cart.length === 0 
              ? 'Agrega productos al carrito'
              : 'Pagar'
          }        
          </Button>
      </div>
    </div>
  );
}

export default Cart;