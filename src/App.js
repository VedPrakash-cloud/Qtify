import Navbar from "./component/navbar";
import Hero from "./component/hero";
import Albums from "./component/topAlbums";
import NewAlbum from "./component/newAlbum";
import BasicTabs from "./component/genreList";
import Faqs from "./component/faq";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero />
      <Albums />
      <NewAlbum />
      <BasicTabs />
      <Faqs />
    </div>
  );
}

export default App;
