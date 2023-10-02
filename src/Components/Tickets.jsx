import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();
    console.log(userId)
    // async function fetchData() {
    //   try {
    //     const response = await fetch('your-api-endpoint-here');
    //     const jsonData = await response.json();
    //     setData(jsonData);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   }
    // }


    // useEffect(() => {
    //     const userId = sessionStorage.getItem("userId");
    //     console.log("User ID from sessionStorage:", userId);
    //     axios.get(`http://localhost:3001/api/getbookedtkts/${userId}`)
    //     .then((response)=>{
    //         console.log(response.data)
    //     })
    // }, []);
    // useEffect(() => {
    //   const userId = sessionStorage.getItem("userId");
    //   console.log("User ID from sessionStorage:", userId);
      
    //   axios.get(`http://localhost:3001/api/getbookedtkts/${userId}`)
    //     .then((response) => {
    //       console.log(response.data);
    //       setData(response.data); // Update the data state with the fetched data
    //       setLoading(false); // Set loading to false when data is fetched
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching data:', error);
    //       setLoading(false);
    //     });
    // }, []);
  


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Tickets</h1>
          <ul>
            {data.map((ticket, index) => (
              <li key={index}>
                <h2>Movie: {ticket.movieName}</h2>
                <p>User: {ticket.userId}</p>
                {/* Add more ticket information here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Tickets