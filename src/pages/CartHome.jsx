import { useContext } from 'react';
import { MiContexto } from '../context/MiContexto';
import { useNavigate } from 'react-router-dom';

function CartHome() {
  const { cart, setCart, total } = useContext(MiContexto);
  const navigate = useNavigate();

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

  return (
    <div className="cart-home">
      <h1 className="cart-title">Carrito de compras</h1>
      {cart.map((item) => (
        <div className='cart-item' key={item.id}>
          <img src={item.img} alt={item.name} className='cart-item-img' />
          <div className='cart-item-details'>
            <h2 className='cart-item-name'>{item.name}</h2>
            <p className='cart-item-price'>$ {item.price}</p>
          </div>
          <div className='cart-item-quantity'>
            <button onClick={() => increaseQuantity(item.id)} className='cart-item-btn'>+</button>
            <p className='cart-item-quantity-text'>{item.quantity}</p>
            <button onClick={() => decreaseQuantity(item.id)} className='cart-item-btn'>-</button>
          </div>
        </div>
      ))}
      <div className='cart-total'>
        <h3>Total: $ {total}</h3>
        <button 
          className='cart-pay-btn'
          onClick={() => navigate('/cart')}
        >
          Ir al Carrito
        </button>
      </div>
    </div>
  );
}

export default CartHome;