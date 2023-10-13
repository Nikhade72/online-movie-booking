import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  console.log(userId)
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getbookedtkts/${userId}`, {
          headers: {
            'Cache-Control': 'no-cache', // Ensure fresh data is fetched
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
        // Add additional error handling here if needed
      }
    };

    fetchTickets();
  }, [userId]);
 
  return (
  //   <div>
  //   {loading ? (
  //     <p style={{ textAlign: 'center', fontSize: '25px', marginTop: '250px' }}>Loading...</p>
  //   ) : (
  //     <div>
  //       {data.length === 0 ? (
  //         <h1>No Tickets</h1>
  //       ) : (
  //         <div>
  //           <h1>Your Tickets</h1>
  //           <ul>
  //             {data.map((movie, index) => (
  //               <li key={movie._id}>
  //                 <h3>Movie Name: {movie.MovieName}</h3>
  //                 <img src={movie.Image} alt={movie.MovieName} />
  //                 <p>Category: {movie.Category}</p>
  //                 <p>Languages: {movie.Languages.join(', ')}</p>
  //                 {/* Add more movie information as needed */}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  //   )}
  // </div>
  // <div>
  //     {loading ? (
  //       <p style={{ textAlign: 'center', fontSize: '25px', marginTop: '250px' }}>Loading...</p>
  //     ) : (
  //       <div>
  //         {data.length === 0 ? (
  //           <h1>No Tickets</h1>
  //         ) : (
  //           <div>
  //             <h1>Your Tickets</h1>
  //             <ul>
  //               {data.map((ticket, index) => (
  //                 <li key={index}>
  //                   <h3>Movie Name: {ticket.movieName}</h3>
  //                   <p>Seat Number: {ticket.seat_number}</p>
  //                   {/* Add more ticket information as needed */}
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
//   <div>
//   {loading ? (
//     <p style={{ textAlign: 'center', fontSize: '25px', marginTop: '250px' }}>Loading...</p>
//   ) : (
//     <div>
//       {data.length === 0 ? (
//         <h1>No Tickets</h1>
//       ) : (
//         <div>
//           <h1>Your Tickets</h1>
//           <ul>
//             {data.map((ticket, index) => (
//               <li key={index}>
//                 <h3>Movie Name: {ticket.movieName}</h3>
//                 <p>Seat Number: {ticket.seat_number}</p>
//                 {/* Add more ticket information as needed */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )}
// </div>
<div className="add" style={{ backgroundImage: 'url("https://tse1.mm.bing.net/th?id=OIP.2HIX184r17IvA1VRuXdtbAHaFL&pid=Api&P=0&h=180")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 'auto' }}>
<div className="container mt-5">
      {loading ? (
        <p className="text-center h3">Loading...</p>
      ) : (
        <div>
          {data.length === 0 ? (
            <h1 className="text-center">No Tickets</h1>
          ) : (
            <div>
              <h1 className="text-center">Your Tickets</h1>
              <ul className="list-group">
                {data.map((ticket, index) => (
                  <li key={index} className="list-group-item">
                    <h3>Movie Name: {ticket.movieName}</h3>
                    <p>Seat Number: {ticket.seat_number}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
</div>
  )
}

export default Tickets