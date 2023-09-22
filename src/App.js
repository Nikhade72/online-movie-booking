import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import User from "./Components/User";
import Admin from "./Components/Admin";
import MovieDetails from "./Components/MovieDetails";
import MovieList from "./Components/MovieList";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/movielist" element={<MovieList/>}/>
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/user" element ={<User/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
