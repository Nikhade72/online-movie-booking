import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  console.log(userId)
 
  
  return (
    <div>
    {loading ? (
      <p style={{ textAlign: 'center', fontSize: '25px', marginTop: '250px' }}>Loading...</p>
    ) : (
      <div>
        <h1> No Tickets</h1>
        <ul>
          {data.map((ticket, index) => (
            <li key={index}>
              {/* Render ticket information here */}
              {/* Example: */}
              <p>Ticket ID: {ticket.id}</p>
              <p>Event Name: {ticket.eventName}</p>
              {/* Add more ticket information as needed */}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  )
}

export default Tickets