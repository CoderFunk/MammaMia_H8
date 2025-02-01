import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null);

  // Agregar método getMe
  const getMe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener datos del usuario');
      }

      const data = await response.json();
      setEmail(data.email);
      return data;

    } catch (error) {
      console.error("Error en getMe:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Error en registro');
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(email);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      return true;

    } catch (error) {
      console.error("Error en registro:", error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error en login');
      }
  
      // Debug
      console.log('Respuesta del servidor:', data);
  
      if (data.token) {
        setToken(data.token);
        setEmail(email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        return true;
      } else {
        throw new Error('Token no recibido');
      }
  
    } catch (error) {
      console.error("Error en login:", error);
      throw error; // Propagar error para manejarlo en el componente
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getMe }}>
      {children}
    </UserContext.Provider>
  );
};