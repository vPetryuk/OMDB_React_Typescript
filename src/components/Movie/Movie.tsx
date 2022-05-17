import React from "react";
import MovieStyle from "./Movie.module.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface IProps{
movie: any;

};

const Movie = ( {movie}:IProps) => {
 
  return (
    <div className={MovieStyle.center}>
     <Card sx={{ maxWidth: 300 }} > 
     <CardActionArea >
       
       <CardMedia
         component="img"
         height="340"
         image= {movie.Poster}
         alt="green iguana"
       />
       <CardContent >
         <Typography gutterBottom variant="h6" component="div">
         {movie.Title}
         </Typography>
         <Typography variant="body2" color="text.secondary">
         {movie.Year}
         </Typography>
       </CardContent>
     </CardActionArea>
   </Card>
   </div>
  );
};


export default Movie;