import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/'); // This will navigate to the home page ('/') route.
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <button
        onClick={navigateToHome}
        style={{
          backgroundColor: '#007bff', // Set the background color
          color: '#fff', // Set the text color
          padding: '10px 20px', // Set padding
          border: 'none', // Remove the border
          borderRadius: '5px', // Add rounded corners
          cursor: 'pointer', // Change cursor on hover
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout