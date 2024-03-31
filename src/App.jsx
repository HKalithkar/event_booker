import React from "react";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import SignIn from "./components/signin/SignIn";
import MyAccount from "./components/myaccount/MyAccount";
import Events from "./components/events/Events";
import NewEvent from "./components/newevent/NewEvent";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/events" element={<Events />} />
          <Route path="/createEvent" element={<NewEvent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
