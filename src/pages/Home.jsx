import React, { useState, useEffect, useContext } from 'react';
import { MiContexto } from '../context/MiContexto';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import Cart from './CartHome'; // Importar el componente Cart

const Home = () => {
  const [pizzasAPI, setPizzas] = useState([]);
  const { cart, setCart, calculateTotal } = useContext(MiContexto);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        console.log(data);
      });
  }, []);

  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizza.id);
      if (existingPizza) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
    calculateTotal();
  };

  return (
    <div>
      <Header />
      {cart.length > 0 && <Cart />} {/* Mostrar Cart si el carrito no está vacío */}

      <div className="container jc-center">
        <div className="row jc-center-card">
          {pizzasAPI.map((pizza) => (
            <CardPizza
              key={pizza.id}
              id={pizza.id}           // ✅ Agregar esta línea
              nombre={pizza.name}
              precio={pizza.price}
              ingredientes={pizza.ingredients}
              imagen={pizza.img}
              onAddToCart={() => addToCart(pizza)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;