import React,{ useState,useEffect } from "react";
import PokemonList from "./PokemonList";
import axios  from "axios";
import Pagination from "./Pagination";


function App() {

  const [pokemon,setPokemon]=useState([]);
  const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl,setNextPageUrl] = useState();
  const [prevPageUrl,setPrevPageUrl] = useState();
  const [loading,setLoading] = useState(true);
  
  useEffect(()=>{
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl,{cancelToken: new axios.CancelToken(c=> cancel=c)}).then(res=>{
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p=> p.name))
      setLoading(false);
    })

    return ()=> cancel()
  },[currentPageUrl])

  function goToNextPage(){
      setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl);
  }

  if(loading) return "Loading..."
  return (
    <>
    <h1 className="text-center text-7xl font-['pokemon'] m-5 p-2">Pokedex</h1>
    <div >
    <PokemonList pokemon={pokemon}/>
    </div>
    
    <Pagination 
    goToNextPage={goToNextPage?goToNextPage:null} 
    goToPrevPage={goToPrevPage?goToPrevPage:null}
    />
    </>
  )
}

export default App
