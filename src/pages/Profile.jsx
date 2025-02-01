import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { email, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="profile-container" id="profile">
        <div><h1>Profile</h1></div>
        <p><h3>Perfil de usuario</h3></p>
        <img 
          src="https://c0.klipartz.com/pngpicture/81/570/gratis-png-perfil-logo-iconos-de-computadora-usuario-usuario.png" 
          alt="Foto de perfil" 
          className="profile-pic" 
        />
        <p>Usuario Autenticado</p>
        <p>Email:</p>
        <div className="email">{email}</div>
        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>    
    </>
  );
};

export default Profile;