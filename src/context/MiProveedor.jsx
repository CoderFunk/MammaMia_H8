import { useState, useEffect } from 'react';
import { MiContexto } from "./MiContexto";
//import pizzaCart from '../data/pizzas';

export const MiProveedor = ({ children }) => {
  // const initialCart = pizzaCart.slice(0, 3).map((pizza) => ({
  //   ...pizza,
  //   quantity: 1,
  // }));

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const newTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <MiContexto.Provider value={{ cart, setCart, total, calculateTotal }}>
      {children}
    </MiContexto.Provider>
  );
};