import Navbar from "./component/navbar";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/register";
import logo from "./assets/hero.svg";
import Faqs from "./component/faq";
import SongLists from "./component/songLists";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [option, setOption] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const prevData = JSON.parse(localStorage.getItem("userData")) || [];

    prevData.push(formData);

    localStorage.setItem("userData", JSON.stringify(prevData));

    setActiveForm("login");
    console.log("all users:", prevData);
  };

  return (
    <div className="App">
      <Navbar
        option={option}
        setOption={setOption}
        setActiveForm={setActiveForm}
      />
      <Routes>
        <Route
          path="/"
          element={
            activeForm === null ? (
              <img
                src={logo}
                alt="login banner"
                className="h-screen w-4/5 -rotate-45"
              />
            ) : activeForm === "login" ? (
              <div className="flex gap-5 items-center">
                <img
                  src={logo}
                  alt="login banner"
                  className="h-screen w-3/5 -rotate-45"
                />
                <Login setOption={setOption} setActiveForm={setActiveForm} formData={formData} />
              </div>
            ) : activeForm === "register" ? (
              <div className="flex items-center gap-5 px-6">
                <img
                  src={logo}
                  alt="login banner"
                  className="h-screen w-3/5 -rotate-45"
                />
                <Register setActiveForm={setActiveForm} handleChange={handleChange} handleFormSubmit={handleFormSubmit} />
              </div>
            ) : null
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/album/:id" element={<SongLists />} />
        <Route path="/new-album/:id" element={<SongLists />} />
      </Routes>
      <Faqs />
    </div>
  );
}

export default App;
