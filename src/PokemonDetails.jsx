import React,{useState,useEffect} from 'react';
import { useLocation,useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const pokeTypeTheme = createTheme({
  palette: {
    normal: {
      main: '#251417',
    },
    fighting: {
      main: '#d14461',
    },
  flying:{ main:"#84a4db"},
  poison:{ main:"#ad62c5"},
  ground:{ main:"#df6c31"},
  rock:{ main:"#c1af81"},
  bug:{ main:"#8fc622"},
  ghost:{ main:"#4a68b0"},
  steel:{ main:"#598ca2"},
  fire:{ main:"#c60204"},
  water:{ main:"#3490db"},
  grass:{ main:"#038e3a"},
  electric:{ main:"#fad000"},
  psychic:{ main:"#78388e"},
  ice:{ main:"#96d3d4"},
  dragon:{ main:"#006ec7"},
  dark:{ main:"#5a5365"},
  fairy:{ main:"#f987e9"},
  unknown:{ main:"#000000"},
  shadow:{ main:"#686868"},
  },
});
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

function PokemonDetails() {

  function getCotrastFromColor(hex) {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;
    const GAMMA = 2.4;
  
    function luminance (r, g, b) {
      var a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
      });
      return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
    }
  
    function contrast (rgb1, rgb2) {
      var lum1 = luminance(...rgb1);
      var lum2 = luminance(...rgb2);
      var brightest = Math.max(lum1, lum2);
      var darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }
  
    function hexToRgb(hex) {
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
  
      return [r, g, b];
    }
  
    const rgb = hexToRgb(hex);
    const black = [0, 0, 0];
    const white = [255, 255, 255];
    const blackContrast = contrast(rgb, black);
    const whiteContrast = contrast(rgb, white);
  
    return blackContrast > whiteContrast ? '#000000' : '#FFFFFF';
  }
  
const [image,setImage] = useState("");
const baseUrl= "https://pokeapi.co/api/v2/pokemon/"

const [description,setDescription] = useState("");
const [uniqueDescription,setUniqueDescription] = useState("");
const [pokedexId,setPokedexId] = useState();
const [abilities,setAbilities] = useState([]);
const {id} = useParams();
const [types,setTypes] = useState([]);
const pname = id;

const  onlyUnique =(value, index, array)=>{
  return array.indexOf(value) === index;
}

useEffect(()=>{
 axios.get(baseUrl+pname).then(p=>{
    
    console.log("axios",p.data);
    setTypes(p.data.types)
    p.data.abilities.map((e)=>{  setAbilities((lol)=>{if(lol){return [lol,e.ability.name]} else{return [e.ability.name]}});});
    
    setPokedexId(p.data.id)
    setImage(p.data.sprites.other["official-artwork"].front_default);
    axios.get(p.data.species.url).then(d=>d.data.flavor_text_entries).then(v=>v.filter((description)=>{return description.language.name === "en"})).then(arr=>{ setDescription(arr[Math.floor(Math.random()*(arr.length -1))].flavor_text)});

  });
  },[]);

  

  return (
    <>
    <div className='flex felx-row items-center justify-center'>
            <span className='font-bold m-5 text-6xl  border-2 border-[#222]  p-3 '>{pname.charAt(0).toUpperCase()+pname.slice(1)+" #"+pokedexId}</span>
    </div>
    <div className='flex sm:flex-col xl:flex-row'>
        <div className='image-area flex flex-row items-center p-5 m-5 justify-center min-w-[45vw] '>
        <Card  key={pname} className='holo-card'>
        <CardActionArea className=' min-w-[80vw] min-h-[50vh] xl:min-w-[50vw] xl:min-h-[50vh]  flex flex-col items-center justify-center m-0 p-0 ' >
        <CardMedia
          className='flex flex-col items-center justify-cente'
          component="img"
          image={image}
          alt={pname}
          sx={{objectFit:"contain"}}
        />
        
      </CardActionArea>
    </Card>
        </div>

      <div className='information-area  p-5 m-5 items-center justify-center text-[#222]'>
        
        <div className='flex flex-col '>
        <div className='bg-white m-2 p-2 border border-[#222]'>
        <p className='m-3'>
        Description
        </p>
        <p className='m-3'>
        {description}
        </p>
      </div>
      <div className={`m-2 border p-2 bg-white border-[#222]`}>
      <div>
      
      <p className='m-3'>
        Type
      </p>
      <div>
        {
          types.map((e)=>{
            return (<><ThemeProvider theme={pokeTypeTheme}><Chip className={`m-1`} key={e.type.name} sx={{backgroundColor:`${e.type.name}.main`,color:getCotrastFromColor(colorFromType[e.type.name])}} label={e.type.name} /></ThemeProvider></>)
          })
        }
      
      </div>
    </div>
    </div>
    </div>
    <div className='bg-white m-2 p-2 border border-[#222]'>
        <p className='m-3'>
        Abilities
        </p>
        <div className='m-3 flex flex-row flex-wrap'>
          {abilities.map((e)=>{
            return (<p className='m-1 p-1 bg-[#e2e2e2] text-[#222] border rounded-3xl border-[#222]' key={" "+e+" s"}>{e}</p>)
          })}
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default PokemonDetails