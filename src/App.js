import Navbar from "./component/navbar";
import Home from "./component/Home";
import Faqs from "./component/faq";
import SongLists from "./component/songLists";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/album/:id" element={<SongLists />}/>
        <Route path="/new-album/:id" element={<SongLists />}/>
      </Routes>
      <Faqs />
    </div>
  );
}

export default App;
