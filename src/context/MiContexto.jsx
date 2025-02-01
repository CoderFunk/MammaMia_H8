import { createContext } from "react";

/*export const MiContexto = createContext();*/

// Crear un contexto con valores predeterminados
export const MiContexto = createContext({
  cart: [], // Estado inicial del carrito, una lista vacía
  setCart: () => {}, // Función para actualizar el carrito, inicialmente una función vacía
  total: 0, // Total inicial del carrito, 0
  calculateTotal: () => {} // Función para calcular el total del carrito, inicialmente una función vacía
});