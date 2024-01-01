import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link, RouterProvider} from "react-router-dom"


const baseUrl= "https://pokeapi.co/api/v2/pokemon/"
const baseImg="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

const colorFromType={
  "normal":"#251417",
  "fighting":"#d14461",
  "flying":"#84a4db",
  "poison":"#ad62c5",
  "ground":"#df6c31",
  "rock":"#c1af81",
  "bug":"#8fc622",
  "ghost":"#4a68b0",
  "steel":"#598ca2",
  "fire":"#c60204",
  "water":"#3490db",
  "grass":"#038e3a",
  "electric":"#fad000",
  "psychic":"#78388e",
  "ice":"#96d3d4",
  "dragon":"#006ec7",
  "dark":"#5a5365",
  "fairy":"#f987e9",
  "unknown":"#000000",
  "shadow":"#686868"

}

async function SetColor(pname,setImage,setPrimaryColor,setSecondaryColor){
  await useEffect(()=>{
     axios.get(baseUrl+pname).then(p=>{
      setImage(p.data.id);
      
      p.data.types[0]?setPrimaryColor(colorFromType[p.data.types[0].type.name]):null;
      p.data.types[1]?setSecondaryColor(colorFromType[p.data.types[1].type.name]):null;
    })
    
  },[]);
}

function Pokemon({pname}) {
    const [image,setImage] = useState(0);
    const [primaryColor,setPrimaryColor] = useState("#ffffff")
    const [secondaryColor,setSecondaryColor] = useState("#ffffff");
    SetColor(pname,setImage,setPrimaryColor,setSecondaryColor);
    
  return (
    <>
    <Link to={`/pokemon/${pname}`} state={pname} >
    <div className="card" id={`${pname}`}>
      
    <Card sx={{ maxWidth: 310,backgroundImage:`linear-gradient(-135deg,${primaryColor},${secondaryColor?secondaryColor:primaryColor})`,borderRadius:0}} key={pname} >
      <CardActionArea >
        <CardMedia
          component="img"
          image={baseImg+image+".png"}
          alt={pname}
          sx={{objectFit:"contain"}}
           
        />
        <CardContent sx={{display:"flex",justifyContent:"center"}}  >
          <Typography gutterBottom variant="h5" component="div"  >
            {pname}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </Link>
  </>
  )
}

export default Pokemon