import Hero from "./hero";
import Albums from "./topAlbums";
import NewAlbum from "./newAlbum";
import BasicTabs from "./genreList";

export default function Home(){
    return(
        <div>
            <Hero />
            <Albums />
            <NewAlbum />
            <BasicTabs />
        </div>
    )
}