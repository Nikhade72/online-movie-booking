import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import User from "./Components/User";
import Admin from "./Components/Admin";
import MovieDetails from "./Components/MovieDetails";
import MovieList from "./Components/MovieList";
import Footer from "./Components/Footer";
import Userheader from "./Components/Userheader";
import Logout from "./Components/Logout";
import Booking from "./Components/Booking";
import AddMovies from "./Components/AddMovies";
import ShowMore from "./Components/ShowMore";
import AdminNav from "./Components/AdminNav";
import MyBooking from "./Components/MyBooking";
import Tickets from "./Components/Tickets";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/movielist" element={<MovieList/>}/>
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/user" element ={<User/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/userheader" element={<Userheader/>}/>
        <Route path="/logout" element={<Logout />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addmovies" element={<AddMovies />} />
        <Route path="/showmore" element={<ShowMore />} />
        <Route path="/adminnav" element={<AdminNav />} />
        <Route path="/mybooking/:bookingId" element={<MyBooking />} /> 
        <Route path="/tickets" element={<Tickets />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
