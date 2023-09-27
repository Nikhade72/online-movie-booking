import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/'); // This will navigate to the home page ('/') route.
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={navigateToHome}>Logout</button>
    </div>
  );
}

export default Logout