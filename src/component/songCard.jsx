import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";


export default function MultiActionAreaCard({ list }) {
  const stateValue = list.follows ?? list.likes;
  const stateLabel = list.follows ? "" : "likes";

  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            className="w-64 h-48 object-contain"
            height='40'
            image={list.image}
            alt="album cover"
          />
          <CardContent className="flex item-start">
            <div className="bg-[#121212] rounded-2xl px-4 py-1 text-white text-sm">
              {stateValue} {stateLabel}
            </div>
          </CardContent>
          </CardActionArea>
      </Card>
      <p className="text-white text-sm">{list.title}</p>
    </div>
  );
}
